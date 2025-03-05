import { z } from "zod";
import { definitions, operations } from "~/lib/api-types/schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import rawgClient from "~/server/rawg/client";

export const gameRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  list: publicProcedure.query(async () => {
    const gamesResponse = await rawgClient.GET("/games", {
      params: {
        query: {
          page: 1,
          page_size: 20,
        },
      },
    });

    const gamesResult =
      (await gamesResponse.response.json()) as operations["games_list"]["responses"]["200"]["schema"];
    return gamesResult.results;
  }),
});
