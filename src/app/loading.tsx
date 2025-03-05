export default function Loading() {
  // Create an array of 8 placeholder items
  const placeholders = Array.from({ length: 8 }, (_, i) => i);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Game Explorer
        </h1>

        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {placeholders.map((i) => (
              <div
                key={i}
                className="flex h-full animate-pulse flex-col overflow-hidden rounded-lg bg-white/10 shadow-lg"
              >
                <div className="h-48 w-full bg-gray-700"></div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 h-6 w-3/4 rounded bg-gray-700"></div>
                  <div className="mb-4 h-4 w-1/2 rounded bg-gray-700"></div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="h-4 w-10 rounded bg-gray-700"></div>
                    <div className="h-4 w-16 rounded bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
