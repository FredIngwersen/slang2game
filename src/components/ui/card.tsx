import * as React from "react";
import Image from "next/image";

import { cn } from "~/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

interface CardImageProps extends React.ComponentProps<typeof Image> {
  wrapperClassName?: string;
}

function CardImage({
  wrapperClassName,
  className,
  alt,
  ...props
}: CardImageProps) {
  return (
    <div
      data-slot="card-image"
      className={cn(
        "relative -mt-6 mb-6 w-full overflow-hidden rounded-t-xl",
        wrapperClassName,
      )}
    >
      <Image
        alt={alt || "Card image"}
        className={cn("object-cover", className)}
        {...props}
      />
    </div>
  );
}

// New component for card with background image
interface CardWithBackgroundProps extends React.ComponentProps<"div"> {
  backgroundSrc?: string;
  backgroundAlt?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

function CardWithBackground({
  backgroundSrc,
  backgroundAlt = "Card background",
  overlay = false,
  overlayClassName,
  className,
  children,
  ...props
}: CardWithBackgroundProps) {
  return (
    <Card className={cn("relative overflow-hidden p-0", className)} {...props}>
      {backgroundSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {overlay && (
        <div
          className={cn(
            "absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent",
            overlayClassName,
          )}
        />
      )}

      <div className="relative z-20 flex h-full w-full flex-col">
        {children}
      </div>
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardWithBackground,
};
