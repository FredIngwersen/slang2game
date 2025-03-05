import { db, schema } from "~/server/db";
import { GameModel } from "~/server/db/schema";
import { embedGameText } from "~/lib/utils/geminiEmbed";

export const embedAndUpsert = async (gameDetails: any) => {
  try {
    // Check if the game already exists in the database
    // const existingGame = await db.query.games.findFirst({
    //   where: (games, { eq }) => eq(games.id, gameDetails.id),
    // });

    // if (existingGame) {
    //   console.log(
    //     `Game ${gameDetails.id} (${gameDetails.name}) already exists in database, skipping...`,
    //   );
    //   return;
    // }

    console.log(`Processing game ${gameDetails.id}: ${gameDetails.name}`);

    // Generate embedding for the description_raw field
    const embedding = await embedGameText(gameDetails.description_raw ?? "");

    // Extract tags, genres, and platforms from the game details
    const tags = gameDetails.tags?.map((tag: any) => tag.name) || [];
    const genres = gameDetails.genres?.map((genre: any) => genre.name) || [];
    const platforms =
      gameDetails.platforms?.map((platform: any) => platform.platform.name) ||
      [];

    // Combine all relevant game data for the embedding record
    const gameData: GameModel = {
      id: gameDetails.id ?? 0,
      name: gameDetails.name ?? "",
      description: gameDetails.description_raw ?? "",
      tags: tags,
      genres: genres,
      platforms: platforms,
      released: new Date(gameDetails.released ?? "").toISOString(),
      backgroundImage: gameDetails.background_image ?? "",
      embedding: embedding.values,
      rating: gameDetails.rating ?? 0,
      ratingTop: gameDetails.rating_top ?? 0,
      ratingCount: gameDetails.ratings_count ?? 0,
      playtime: gameDetails.playtime ?? 0,
    };

    // Insert or update the game embedding in the database
    await db
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
          rating: gameData.rating,
          ratingTop: gameData.ratingTop,
          ratingCount: gameData.ratingCount,
          playtime: gameData.playtime,
        },
      });

    console.log(
      `Successfully processed game ${gameDetails.id}: ${gameDetails.name}`,
    );
  } catch (error) {
    console.error(`Error processing game ${gameDetails.id}:`, error);
  }
};
