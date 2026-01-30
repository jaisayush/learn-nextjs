import Link from "next/link";

// CONCEPT: Special Files (not-found.tsx)
// Next.js recognizes 'not-found.tsx' automatically.
// It is shown when 'notFound()' is called or a URL doesn't match a route.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">404 - Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Could not find requested resource. The product you are looking for might
        have been removed or renamed.
      </p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Return to Shop
      </Link>
    </div>
  );
}
