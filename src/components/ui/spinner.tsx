import { Loader2 } from "lucide-react";

import { cn } from "~/lib/utils";

type SpinnerProps = {
  className?: string;
  center?: boolean;
  fullScreen?: boolean;
};

const Spinner = ({ className, center, fullScreen }: SpinnerProps) => {
  if (!center)
    return <Loader2 className={cn("animate-spin stroke-5", className)} />;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 items-center justify-center",
        fullScreen && "h-screen",
      )}
    >
      <Loader2 className={cn("animate-spin stroke-5", className)} />
    </div>
  );
};

export default Spinner;
