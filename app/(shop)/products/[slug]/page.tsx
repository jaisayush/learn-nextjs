import { products } from "../../../_lib/data";
import { notFound } from "next/navigation";

// CONCEPT: Dynamic Routes
// The folder '[slug]' is a Dynamic Route.
// It acts like a wildcard. '/products/iphone' -> slug = 'iphone'.

// CONCEPT: Params (Day 1 Recommendation)
// In Next.js 15, params is asynchronous (a Promise).
// We must await it before using the properties.
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetail({ params }: Props) {
  // 1. Await the params to get the slug
  const { slug } = await params;

  // 2. Fetch the data
  const product = products.find((p) => p.slug === slug);

  // CONCEPT: Not Found
  // If we can't find the product, we tell Next.js to show the 404 page.
  // This automatically stops rendering and shows 'not-found.tsx'.
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        {product.name}
      </h1>

      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        {product.description}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Price</p>
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
