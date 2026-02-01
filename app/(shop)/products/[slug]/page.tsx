import { products } from "../../../_lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BuyButton from "@/components/BuyButton";

// CONCEPT: Dynamic Routes
// The folder '[slug]' is a Dynamic Route.
// It acts like a wildcard. '/products/iphone' -> slug = 'iphone'.

// CONCEPT: Params (Day 1 Recommendation)
// In Next.js 15, params is asynchronous (a Promise).
// We must await it before using the properties.
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// CONCEPT: Dynamic Metadata
// Since the title depends on the product data, we cannot use a static object.
// We export 'generateMetadata' which receives the same 'params' as the page.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. Await params (just like in the component)
  const { slug } = await params;

  // 2. Fetch data (Next.js automatically dedupes requests if we used fetch())
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | NextStore`,
    description: product.description,
  };
}

export default async function ProductDetail({ params, searchParams }: Props) {
  // 1. Await params & searchParams
  const { slug } = await params;
  const { error } = await searchParams;

  // VERIFICATION: Trigger error via URL
  // Visit /products/iphone?error=true to test error.tsx
  if (error === "true") {
    throw new Error("Boom! triggered by ?error=true");
  }

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

        <div className="flex gap-4">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all">
            Add to Cart
          </button>
          <BuyButton />
        </div>
      </div>
    </div>
  );
}
