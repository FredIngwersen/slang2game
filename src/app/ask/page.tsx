import { GameSearch } from "~/components/GameSearch/GameSearch";

export default function Ask() {
  return (
    <div className="flex flex-col px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Game Explorer
      </h1>

      <GameSearch />
    </div>
  );
}
