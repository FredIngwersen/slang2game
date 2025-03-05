import { CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { GameModel } from "~/server/db/schema";

type GameCardBackProps = {
  gameDetails: GameModel;
};

const GameCardBack = ({ gameDetails }: GameCardBackProps) => {
  if (!gameDetails.id) {
    return null;
  }
  return (
    <div className="absolute inset-0 rotate-y-180 overflow-visible backface-hidden">
      <div className="relative z-10 px-4">
        <CardHeader>
          <CardTitle className="text-lg">{gameDetails.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm prose-invert max-h-[300px] overflow-y-auto">
            {gameDetails.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: gameDetails.description }}
              />
            ) : (
              <p className="text-gray-400">No description available</p>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default GameCardBack;
