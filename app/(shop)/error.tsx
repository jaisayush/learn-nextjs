"use client";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 border-4 border-red-100 rounded-xl bg-red-50 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Shop Layout Error</h2>
      <p className="text-sm text-red-800 mb-4">
        This error boundary lives in <code>app/(shop)/error.tsx</code>. It
        catches errors happening in <code>app/(shop)/layout.tsx</code> or any
        child page.
      </p>
      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Try Reloading Shop
      </button>
    </div>
  );
}
