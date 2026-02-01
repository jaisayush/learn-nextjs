import Modal from "@/components/Modal";
import { products } from "../../../../_lib/data";
import Image from "next/image";

// CONCEPT: Intercepting Routes
// The '(.)' prefix matches the segment on the same level.
// When navigating from '/products' to '/products/1', this file intercepts!
// It renders INSIDE the ShopLayout's 'modal' slot (because it's in @modal folder).
// If you refresh the page, the interception is lost, and the normal page renders.

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductModal({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return null;

  return (
    <Modal>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase mb-4 inline-block">
          {product.category}
        </span>
        <p className="text-gray-600 leading-relaxed mb-8">
          {product.description}
        </p>
        <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
          <div>
            <span className="block text-sm text-gray-500">
              Quick View Price
            </span>
            <span className="text-2xl font-bold">${product.price}</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
}
