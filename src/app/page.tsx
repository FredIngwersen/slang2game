import { api, HydrateClient } from "~/trpc/server";
import GameCard from "~/components/GameCard/GameCard";

export default async function Home() {
  const games = await api.game.list();

  return (
    <HydrateClient>
      <main className="min-h-screen">
        <div className="flex flex-col px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Game Explorer
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
