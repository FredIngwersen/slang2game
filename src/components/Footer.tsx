import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#15162c] px-6 py-4 text-sm text-white/80">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-2 md:mb-0">
          <p>
            © {new Date().getFullYear()} Slang 2 Game. All rights reserved.
          </p>
        </div>
        <div>
          <p>
            Data provided by{" "}
            <Link
              href="https://rawg.io/apidocs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline hover:text-purple-300"
            >
              RAWG
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
