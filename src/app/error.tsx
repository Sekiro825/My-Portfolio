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
    console.error("App Router Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-ink-900 text-white">
      <h2 className="text-2xl font-bold mb-4 font-display text-3xl">Something went wrong!</h2>
      <p className="text-accent-crimson mb-6 text-sm max-w-md font-mono bg-black/40 p-4 rounded-xl border border-white/10">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-accent-crimson text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-lg"
      >
        Try again
      </button>
    </div>
  );
}
