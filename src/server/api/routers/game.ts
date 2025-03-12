import { definitions } from "~/lib/api-types/schema";
import { withCatchError } from "~/lib/utils/withCatchError";
import { embedGameText } from "~/lib/utils/geminiEmbed";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, arrayContains, cosineDistance, desc, gt, sql } from "drizzle-orm";
import { z } from "zod";
import { schema } from "~/server/db";

export type Game = definitions["Game"] & {
  genres?: definitions["Genre"][];
  description_raw: string;
  tags?: definitions["Tag"][];
};

export const gameRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        platforms: z.array(z.string()).optional(),
        limit: z.number().min(1).max(20).default(6),
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
            platforms.length > 0
              ? arrayContains(schema.games.platforms, platforms)
              : undefined,
            gt(similarity, 0.5),
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

  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(12),
        cursor: z.number().optional(), // ID of the last game for pagination
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const games = await ctx.db.query.games.findMany({
        limit: limit,
        where: cursor ? (games, { gt }) => gt(games.id, cursor) : undefined,
        orderBy: (games, { asc }) => asc(games.id),
      });

      let nextCursor: number | undefined = undefined;
      if (games.length === limit) {
        const lastGame = games[games.length - 1];
        nextCursor = lastGame?.id;
      }

      return {
        games,
        nextCursor,
      };
    }),
});
