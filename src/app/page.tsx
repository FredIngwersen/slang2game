import Link from "next/link";
import Image from "next/image";

import { api, HydrateClient } from "~/trpc/server";
import { definitions } from "~/lib/api-types/schema";

// Game card component to display each game
function GameCard({ game }: { game: definitions["Game"] }) {
  // Extract platform names for display
  const platforms =
    game.platforms?.map((p) => p.platform?.name).filter(Boolean) ?? [];
  const platformsText =
    platforms.slice(0, 3).join(", ") + (platforms.length > 3 ? "..." : "");

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white/10 shadow-lg transition-all hover:scale-[1.02] hover:bg-white/20">
      <div className="relative h-48 w-full">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name ?? "Game cover"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-800">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        {game.metacritic && (
          <div
            className={`absolute right-2 bottom-2 rounded px-2 py-1 text-sm font-bold ${
              game.metacritic >= 75
                ? "bg-green-600"
                : game.metacritic >= 50
                  ? "bg-yellow-600"
                  : "bg-red-600"
            }`}
          >
            {game.metacritic}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-1 text-xl font-bold">{game.name}</h3>

        {platformsText && (
          <p className="mb-2 line-clamp-1 text-sm text-gray-400">
            {platformsText}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-1 text-yellow-400">★</span>
            <span>{game.rating.toFixed(1)}</span>
          </div>
          {game.released && (
            <span className="text-sm text-gray-400">
              {new Date(game.released).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const games = await api.game.list();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Game Explorer
          </h1>

          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {games.length === 0 && (
              <div className="flex h-64 w-full items-center justify-center">
                <p className="text-xl text-gray-400">No games found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
