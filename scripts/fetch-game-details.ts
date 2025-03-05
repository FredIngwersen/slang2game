import "dotenv/config";
import rawgClient from "../src/server/rawg/client";
import { withCatchError } from "../src/lib/utils/withCatchError";
import { db } from "../src/server/db";
import { embedAndUpsert } from "./embedAndUpsert";
import { definitions, operations } from "../src/lib/api-types/schema";

type Game = definitions["Game"];

async function main() {
  try {
    console.log("Starting to fetch game details...");

    const targetGameCount = 500;
    let totalGamesFetched = 0;
    let page = 1;
    const pageSize = 40; // Maximum allowed by RAWG API

    while (totalGamesFetched < targetGameCount) {
      console.log(`Fetching page ${page} of games...`);

      // Fetch a page of games
      const [error, response] = await withCatchError(
        rawgClient.GET("/games", {
          params: {
            query: {
              page,
              page_size: pageSize,
              key: process.env.RAWG_API_KEY,
            },
          },
        }),
      );

      if (error) {
        console.error("Error fetching games list:", error);
        break;
      }

      const gamesResponse =
        response?.data as operations["games_list"]["responses"]["200"]["schema"];
      const games = gamesResponse?.results as Game[];

      if (!games || games.length === 0) {
        console.log("No more games to fetch");
        break;
      }

      // Process each game in the current page
      for (const game of games) {
        if (totalGamesFetched >= targetGameCount) break;

        if (game.id === undefined) {
          console.error(`Game ${game.name} has no ID, skipping...`);
          continue;
        }

        try {
          // Check if the game already exists in the database
          const existingGame = await db.query.games.findFirst({
            where: (games, { eq }) => eq(games.id, game.id ?? 0),
          });

          if (existingGame) {
            console.log(
              `Game ${game.id} (${game.name}) already exists in database, skipping...`,
            );
            totalGamesFetched++;
            continue;
          }

          // Fetch detailed game information
          console.log(`Fetching details for game ${game.id}: ${game.name}`);
          const [detailsError, detailsResponse] = await withCatchError(
            rawgClient.GET(`/games/${game.id}`, {
              params: {
                query: {
                  key: process.env.RAWG_API_KEY,
                },
              },
            }),
          );

          if (detailsError) {
            console.error(
              `Failed to fetch details for game ${game.id}:`,
              detailsError,
            );
            continue;
          }

          const gameDetails = detailsResponse?.data;

          // Process and upsert the game details
          await embedAndUpsert(gameDetails);

          totalGamesFetched++;
          console.log(
            `Progress: ${totalGamesFetched}/${targetGameCount} games processed`,
          );

          // Add a small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (gameError) {
          console.error(`Error processing game ${game.id}:`, gameError);
        }
      }

      page++;

      // Add a delay between pages to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`Finished processing ${totalGamesFetched} games`);
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
}

main();
