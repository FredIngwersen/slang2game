import { Star } from "lucide-react";
import {
  CardHeader,
  CardImage,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { GameSearchResult } from "~/components/GameSearch/actions";
import { GameModel } from "~/server/db/schema";

type GameCardFrontProps = {
  game: GameSearchResult | GameModel;
};

const GameCardFront = ({ game }: GameCardFrontProps) => {
  const platforms = game.platforms.filter(Boolean) ?? [];
  const platformsText =
    platforms.slice(0, 3).join(", ") + (platforms.length > 3 ? "..." : "");

  const similarity = "similarity" in game ? game.similarity : undefined;

  return (
    <div className="absolute inset-0 backface-hidden">
      {game.backgroundImage && (
        <CardImage
          src={game.backgroundImage}
          alt={game.name ?? "Game cover"}
          width={800}
          height={450}
          className="h-64 w-full object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      )}
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {similarity && (
          <p className="line-clamp-1 text-sm text-gray-300">
            Similarity: {similarity.toFixed(2)}
          </p>
        )}
        {game.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <p className="line-clamp-1 text-sm text-gray-300">
              Rating: {game.rating.toFixed(1)}
            </p>
          </div>
        )}
        {game.genres && game.genres.length > 0 && (
          <p className="line-clamp-1 text-sm text-gray-300">
            {game.genres.filter(Boolean).join(", ")}
          </p>
        )}
        {platformsText && (
          <p className="line-clamp-1 text-sm text-gray-300">{platformsText}</p>
        )}
      </CardContent>
      <CardFooter>
        <div className="mt-2 flex items-center">
          <span className="mr-1 text-yellow-400">★</span>
          <span>{game.rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </div>
  );
};

export default GameCardFront;
