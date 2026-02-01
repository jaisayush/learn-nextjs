"use client";

// CONCEPT: Global Error
// 'error.tsx' only catches errors in its children (Pages).
// It does NOT catch errors in the Root Layout.
// 'global-error.tsx' wraps the entire application, including <html> and <body>.
// Used for catastrophic failures.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Critical System Error
          </h2>
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
