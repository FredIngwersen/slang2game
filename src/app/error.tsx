"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="text-xl">
          We encountered an error while trying to load the games.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
