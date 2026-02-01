export default function Loading() {
  // CONCEPT: Loading UI (Streaming)
  // By creating a 'loading.tsx' file, Next.js automatically wraps the page in React Suspense.
  // This component is shown instanly while the server fetches data for 'page.tsx'.
  // We don't need 'if (isLoading)' checks inside the page component anymore!

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-300 animate-pulse">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-lg p-6 bg-gray-50 animate-pulse h-64"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex justify-between mt-auto pt-8">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
