"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { GameModel } from "~/server/db/schema";
import GameCard from "~/components/GameCard/GameCard";
import { api } from "~/trpc/react";
import Spinner from "~/components/ui/spinner";
type InfiniteGameListProps = {
  initialGames: {
    games: GameModel[];
    nextCursor: number | undefined;
  };
};

export default function InfiniteGameList({
  initialGames,
}: InfiniteGameListProps) {
  const [games, setGames] = useState<GameModel[]>(initialGames.games);
  const [cursor, setCursor] = useState<number | undefined>(
    initialGames.nextCursor,
  );

  // Set up intersection observer for infinite scrolling
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 300px 0px", // Load more when user is 300px from the bottom
  });

  const { data, fetchNextPage, isFetching, hasNextPage } =
    api.game.list.useInfiniteQuery(
      { limit: 12 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialData: {
          pages: [initialGames],
          pageParams: [undefined],
        },
        refetchOnWindowFocus: false,
      },
    );

  // Fetch next page when the load more element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  // Update games when data changes
  useEffect(() => {
    if (data) {
      const allGames = data.pages.flatMap((page) => page.games);
      setGames(allGames);

      const lastPage = data.pages[data.pages.length - 1];
      setCursor(lastPage?.nextCursor);
    }
  }, [data]);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Load more trigger element */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isFetching ? (
            <div className="flex items-center gap-2">
              <Spinner center />
              <span>Loading more games...</span>
            </div>
          ) : (
            <div className="h-8" />
          )}
        </div>
      )}

      {!hasNextPage && games.length > 0 && (
        <div className="py-8 text-center text-gray-500">
          No more games to load
        </div>
      )}
    </div>
  );
}
