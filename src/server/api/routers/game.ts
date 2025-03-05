import { definitions, operations } from "~/lib/api-types/schema";
import { withCatchError, withCatchErrorSync } from "~/lib/utils/withCatchError";
import { embedGameText } from "~/lib/utils/geminiEmbed";
import fs from "fs";
import path from "path";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import rawgClient from "~/server/rawg/client";
import { and, cosineDistance, desc, gt, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/server/db";
import { GameModel } from "~/server/db/schema";

export type Game = definitions["Game"] & {
  genres?: definitions["Genre"][];
};
import mockGameListResponse from "~/lib/data/gameList.json";

export const gameRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        platforms: z.array(z.string()).optional(),
        limit: z.number().min(1).max(20).default(3),
      }),
    )
    .query(async ({ input, ctx }) => {
      // Generate embedding for the search query
      const [error, embedding] = await withCatchError(
        embedGameText(input.query),
      );
      if (error)
        throw new Error("Failed to generate embedding for search query");
      const similarity = sql<number>`1 - (${cosineDistance(schema.games.embedding, embedding.values)})`;

      const platforms = input.platforms ?? [];

      // Base query to find similar games by vector similarity
      let query = ctx.db
        .select({
          id: schema.games.id,
          name: schema.games.name,
          description: schema.games.description,
          backgroundImage: schema.games.backgroundImage,
          platforms: schema.games.platforms,
          genres: schema.games.genres,
          tags: schema.games.tags,
          released: schema.games.released,
          rating: schema.games.rating,
          similarity,
        })
        .from(schema.games)
        .where(
          and(
            gt(similarity, 0.5),
            platforms.length > 0
              ? sql`${schema.games.platforms} && ${platforms}`
              : undefined,
          ),
        )
        .orderBy((t) => desc(t.similarity))
        .limit(input.limit);

      const [queryError, results] = await withCatchError(query);
      if (queryError)
        throw new Error("Failed to execute search query", {
          cause: queryError,
        });
      return results;
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const games = await ctx.db.query.games.findMany();
    return games;
  }),

  details: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const gameDetailsPath = path.join(
        process.cwd(),
        "src/lib/data/gameDetailsList.json",
      );

      try {
        // Read the existing game details list
        const [readError, gameDetailsList] = withCatchErrorSync(
          JSON.parse(fs.readFileSync(gameDetailsPath, "utf8")),
        );

        if (readError) {
          throw new Error(`Failed to read game details: ${readError.message}`);
        }

        // Check if the game is already in our list
        const existingGame = gameDetailsList.find(
          (game: any) => game.id === input.id,
        );

        if (existingGame) {
          return existingGame;
        }
        console.log("Game not found in local data", input.id);

        // If game not found in local data, fetch from API
        const [error, response] = await withCatchError(
          rawgClient.GET(`/games/${input.id}`, {
            params: {
              query: {
                key: process.env.RAWG_API_KEY,
              },
            },
          }),
        );

        if (error) {
          throw new Error(`Failed to fetch game details for id: ${input.id}`);
        }

        const gameDetails = response?.data as Game;

        // Append the new game details to our list
        gameDetailsList.push(gameDetails);

        // Write the updated list back to the file
        fs.writeFileSync(
          gameDetailsPath,
          JSON.stringify(gameDetailsList, null, 2),
        );

        return gameDetails;
      } catch (error) {
        // Fallback to mock data if file operations fail
        console.error("Error accessing game details:", error);
        return mockGameListResponse.results.find(
          (game) => game.id === input.id,
        );
      }
    }),

  embed: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if the game already exists in the database
        const existingGame = await ctx.db.query.games.findFirst({
          where: (games, { eq }) => eq(games.id, input.id),
        });

        if (existingGame) {
          return {
            success: true,
            gameId: input.id,
            message: "Game embedding already exists in database",
          };
        }

        // Path to the game details JSON file
        const gameDetailsPath = path.join(
          process.cwd(),
          "src",
          "lib",
          "data",
          "gameDetailsList.json",
        );

        // Read the game details from the file
        const gameDetailsList = JSON.parse(
          fs.readFileSync(gameDetailsPath, "utf8"),
        );

        // Find the game with the matching ID
        const gameDetails = gameDetailsList.find(
          (game: Game) => game.id === input.id,
        ) as definitions["GameSingle"] & {
          description_raw: string;
          tags: definitions["Tag"][];
          genres: definitions["Genre"][];
          platforms: definitions["Platform"][];
          released: string;
        };

        if (!gameDetails) {
          return {
            success: false,
            gameId: input.id,
            message: "Game not found",
          };
        }

        // Generate embedding for the description_raw field
        const embedding = await embedGameText(gameDetails.description_raw);

        // Extract tags, genres, and platforms from the game details
        const tags = gameDetails.tags?.map((tag: any) => tag.name) || [];
        const genres =
          gameDetails.genres?.map((genre: any) => genre.name) || [];
        const platforms =
          gameDetails.platforms?.map(
            (platform: any) => platform.platform.name,
          ) || [];

        // Combine all relevant game data for the embedding record
        const gameData: GameModel = {
          id: gameDetails.id ?? 0,
          name: gameDetails.name ?? "",
          description: gameDetails.description_raw ?? "",
          tags: tags,
          genres: genres,
          platforms: platforms,
          released: new Date(gameDetails.released ?? "").toISOString(),
          embedding: embedding.values,
          rating: gameDetails.rating ?? 0,
          ratingTop: gameDetails.rating_top ?? 0,
          ratingCount: gameDetails.ratings_count ?? 0,
          playtime: gameDetails.playtime ?? 0,
          backgroundImage: gameDetails.background_image ?? "",
        };

        // Insert or update the game embedding in the database
        await ctx.db
          .insert(schema.games)
          .values(gameData)
          .onConflictDoUpdate({
            target: [schema.games.id],
            set: {
              name: gameData.name,
              description: gameData.description,
              tags: gameData.tags,
              genres: gameData.genres,
              platforms: gameData.platforms,
              released: gameData.released,
              embedding: gameData.embedding,
            },
          });

        return {
          success: true,
          gameId: gameDetails.id,
        };
      } catch (error) {
        console.error("Error generating game embedding:", error);
        throw new Error("Failed to generate game embedding");
      }
    }),
});
