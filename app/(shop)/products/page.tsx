import Link from "next/link";
import { products } from "../../_lib/data";

// CONCEPT: Server Component (Default)
// In Next.js, components are Server Components by default.
// We can fetch data directly (like reading 'products' array) without 'useEffect'.
// This runs on the server, then sends HTML to the browser.
export default function ProductList() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {product.name}
              </h2>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">
              {product.description}
            </p>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-lg">${product.price.toFixed(2)}</span>
              <span className="text-blue-500 group-hover:underline">
                View Details &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
