import { db, schema } from "~/server/db";
import { GameModel } from "~/server/db/schema";
import { embedGameText } from "~/lib/utils/geminiEmbed";
import { Game } from "~/server/api/routers/game";
import { withCatchError } from "~/lib/utils/withCatchError";

export const embedAndUpsert = async (gameDetails: Game) => {
  console.log(`Processing game ${gameDetails.id}: ${gameDetails.name}`);

  // Generate embedding for the description_raw field
  const [embedError, embedding] = await withCatchError(
    embedGameText(
      gameDetails.description_raw ?? "",
      gameDetails.genres?.map((genre) => genre.name) ?? [],
      gameDetails.tags?.map((tag) => tag.name) ?? [],
    ),
  );

  if (embedError) {
    throw new Error(`Failed to generate embedding for game ${gameDetails.id}`, {
      cause: embedError,
    });
  }

  // Extract tags, genres, and platforms from the game details
  const tags = gameDetails.tags?.map((tag: any) => tag.name) || [];
  const genres = gameDetails.genres?.map((genre: any) => genre.name) || [];
  const platforms =
    gameDetails.platforms?.map((platform: any) => platform.platform.name) || [];

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
  const [dbError] = await withCatchError(
    db
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
      }),
  );

  if (dbError) {
    throw new Error(`Failed to upsert game ${gameDetails.id} to database`, {
      cause: dbError,
    });
  }

  console.log(
    `Successfully processed game ${gameDetails.id}: ${gameDetails.name}`,
  );
};
