"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import GameCard from "~/components/GameCard/GameCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { searchGames } from "./actions";
import { GameModel } from "~/server/db/schema";

type Platform = {
  id: string;
  name: string;
};

const PLATFORMS: Platform[] = [
  { id: "PC", name: "PC" },
  { id: "PlayStation 5", name: "PlayStation 5" },
  { id: "Xbox Series S/X", name: "Xbox Series S/X" },
  { id: "Nintendo Switch", name: "Nintendo Switch" },
  { id: "iOS", name: "iOS" },
  { id: "Android", name: "Android" },
];

// Define the form schema with Zod
const searchFormSchema = z.object({
  query: z.string().min(1, "Please enter a search query"),
  platforms: z.array(z.string()),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;
type SearchResult = Awaited<ReturnType<typeof searchGames>>;

export function GameSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearched, setIsSearched] = useState(false);

  // Initialize react-hook-form with zod validation
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      platforms: [],
    },
  });

  const handleSearch = async (values: SearchFormValues) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchGames(values.query, values.platforms);
      setSearchResults(results);
      setIsSearched(true);
      setIsSearching(false);
    } catch (error) {
      if (error instanceof Error) {
        setSearchError(error.message);
      } else {
        setSearchError("An unknown error occurred");
      }
      setIsSearching(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    const currentPlatforms = form.getValues("platforms");
    if (currentPlatforms.includes(platformId)) {
      form.setValue(
        "platforms",
        currentPlatforms.filter((id) => id !== platformId),
      );
    } else {
      form.setValue("platforms", [...currentPlatforms, platformId]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      className="bg-background w-full rounded-md border p-3"
                      placeholder="E.g., 'A sci-fi game with a strong narrative and RPG elements' or 'Games like Zelda with open world exploration'"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <p className="mb-2 font-medium">Filter by platform (optional):</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={
                      form.watch("platforms").includes(platform.id)
                        ? "default"
                        : "outline"
                    }
                    type="button"
                    size="sm"
                    onClick={() => togglePlatform(platform.id)}
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!form.formState.isValid || isSearching}
              className="w-full md:w-auto"
            >
              {isSearching ? "Searching..." : "Search Games"}
            </Button>
          </form>
        </Form>
      </div>

      {isSearching && (
        <div className="py-8 text-center">
          <p>Searching for games that match your description...</p>
        </div>
      )}

      {searchError && (
        <div className="py-8 text-center text-red-500">
          <p>Error searching for games: {searchError}</p>
        </div>
      )}

      {searchResults.length === 0 && isSearched && !searchError && (
        <div className="py-8 text-center">
          <p>
            No games found matching your description. Try a different query.
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Search Results</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {searchResults.map((result) => {
              // Convert search result to GameModel type expected by GameCard
              const game: GameModel = {
                id: result.id,
                name: result.name,
                description: result.description,
                backgroundImage: result.backgroundImage,
                platforms: result.platforms || [],
                genres: result.genres || [],
                tags: result.tags || [],
                released: result.released,
                rating: result.rating,
                ratingTop: 5,
                ratingCount: 0,
                playtime: 0,
                embedding: [],
              };

              return (
                <div key={result.id} className="flex flex-col">
                  <GameCard game={game} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
