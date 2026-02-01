import Link from "next/link";
import { products } from "../../_lib/data";

// CONCEPT: Search Params (Query Strings)
// In Next.js 15, 'searchParams' is an async prop (Promise), just like 'params'.
// We use it to read values from the URL like '?sort=price'.
// This allows the server to render different content based on the URL.

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductList({ searchParams }: Props) {
  // CONCEPT: Artificial Delay
  // We add this to FORCE the 'loading.tsx' skeleton to show for 2 seconds.
  // In a real app, this delay comes from the database fetch.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Await the search params
  const { sort } = await searchParams;

  // Create a sorted copy of the data
  let displayedProducts = [...products];
  if (sort === "price") {
    displayedProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-2">
          {/* CONCEPT: Linking with Params */}
          {/* We just use standard <Link> tags with query strings. */}
          <Link
            href="/products"
            className={`px-4 py-2 rounded ${!sort ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Default
          </Link>
          <Link
            href="/products?sort=price"
            className={`px-4 py-2 rounded ${sort === "price" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Sort by Price
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
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
