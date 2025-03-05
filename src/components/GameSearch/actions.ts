"use server";
import { api } from "~/trpc/server";

export const searchGames = async (query: string, platforms?: string[]) => {
  const games = await api.game.search({ query, platforms });
  return games;
};
