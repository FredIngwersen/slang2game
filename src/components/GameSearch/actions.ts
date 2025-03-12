"use server";
import { api } from "~/trpc/server";

export type GameSearchResults = Awaited<ReturnType<typeof searchGames>>;
export type GameSearchResult = GameSearchResults[number];

export const searchGames = async (query: string, platforms?: string[]) => {
  const games = await api.game.search({ query, platforms });
  return games;
};
