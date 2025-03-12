import { api, HydrateClient } from "~/trpc/server";
import InfiniteGameList from "~/components/GameList/InfiniteGameList";

export default async function Explore() {
  const initialGames = await api.game.list({ limit: 15 });

  return (
    <HydrateClient>
      <div className="px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Game Explorer
        </h1>

        <InfiniteGameList initialGames={initialGames} />
      </div>
    </HydrateClient>
  );
}
