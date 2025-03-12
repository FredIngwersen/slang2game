import { Card } from "~/components/ui/card";
import { ComponentProps } from "react";
import { cn } from "~/lib/utils";
import GameCardFront from "~/components/GameCard/GameCardFront";
import GameCardBack from "~/components/GameCard/GameCardBack";
import { GameSearchResult } from "~/components/GameSearch/actions";
import { GameModel } from "~/server/db/schema";

type GameCardProps = {
  game: GameSearchResult | GameModel;
} & ComponentProps<typeof Card>;

const GameCard = ({ game, ...props }: GameCardProps) => {
  if (!game.id) {
    return null;
  }

  return (
    <Card
      className={cn(
        "group relative h-[400px] w-full overflow-hidden shadow-lg transition-all duration-500 [perspective:1000px] hover:[transform-style:preserve-3d]",
        props.className,
      )}
      {...props}
    >
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <GameCardFront game={game} />
        <GameCardBack gameDetails={game} />
      </div>
    </Card>
  );
};

export default GameCard;
