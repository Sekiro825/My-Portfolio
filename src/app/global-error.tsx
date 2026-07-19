"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-ink-900 text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 font-display">Global Error</h2>
        <p className="text-accent-crimson mb-6 text-sm max-w-md font-mono bg-black/40 p-4 rounded-xl border border-white/10">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-accent-crimson text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-lg"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
