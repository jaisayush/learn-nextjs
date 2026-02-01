"use client";

// CONCEPT: Error Components
// Must be Client Components ('use client').
// They wrap the page in a React Error Boundary.

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
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We encountered an error loading this product. It might be a temporary
        glitch.
      </p>
      <div className="flex gap-4">
        {/* CONCEPT: Recovery */}
        {/* The 'reset' function tries to re-render the segment. */}
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <a
          href="/products"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </a>
      </div>
    </div>
  );
}
