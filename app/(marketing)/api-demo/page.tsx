"use client";

// CONCEPT: Frontend-Backend Integration
// This page demonstrates how to call our API routes from the frontend

import { useState } from "react";

export default function APIDemo() {
  const [products, setProducts] = useState<any[]>([]);
  const [singleProduct, setSingleProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.data);
      setMessage(`✅ Fetched ${data.count} products`);
    } catch (error) {
      setMessage("❌ Error fetching products");
    }
    setLoading(false);
  };

  // Search products
  const searchProducts = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setProducts(data.data);
      setMessage(`✅ Found ${data.count} products matching "${query}"`);
    } catch (error) {
      setMessage("❌ Error searching products");
    }
    setLoading(false);
  };

  // Fetch single product
  const fetchSingleProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setSingleProduct(data.data);
      setMessage(`✅ Fetched product: ${data.data.name}`);
    } catch (error) {
      setMessage("❌ Error fetching product");
    }
    setLoading(false);
  };

  // Create product
  const createProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Demo Product",
          price: 99.99,
          description: "Created from the demo page",
          category: "Demo",
        }),
      });
      const data = await res.json();
      setMessage(`✅ Created product: ${data.data.name}`);
      fetchProducts(); // Refresh list
    } catch (error) {
      setMessage("❌ Error creating product");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">API Integration Demo</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates how the frontend connects to our backend API
        routes.
      </p>

      {/* Status Message */}
      {message && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          {message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          GET All Products
        </button>
        <button
          onClick={() => searchProducts("headset")}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Search "headset"
        </button>
        <button
          onClick={() => fetchSingleProduct("1")}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          GET Product #1
        </button>
        <button
          onClick={createProduct}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
        >
          POST New Product
        </button>
      </div>

      {/* Products List */}
      {products.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Products List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-blue-600">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-500 mt-2">ID: {product.id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Product */}
      {singleProduct && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Single Product Detail</h2>
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
            <h3 className="font-bold text-2xl mb-2">{singleProduct.name}</h3>
            <p className="text-gray-700 mb-4">{singleProduct.description}</p>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              ${singleProduct.price}
            </p>
            <div className="text-sm text-gray-600">
              <p>Category: {singleProduct.category}</p>
              <p>Slug: {singleProduct.slug}</p>
              <p>ID: {singleProduct.id}</p>
            </div>
          </div>
        </div>
      )}

      {/* API Endpoints Reference */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Available API Endpoints</h2>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              GET
            </span>
            <code>/api/products</code>
            <span className="text-gray-500">- List all products</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              GET
            </span>
            <code>/api/products?search=query</code>
            <span className="text-gray-500">- Search products</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              GET
            </span>
            <code>/api/products/[id]</code>
            <span className="text-gray-500">- Get single product</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              POST
            </span>
            <code>/api/products</code>
            <span className="text-gray-500">- Create product</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
              PATCH
            </span>
            <code>/api/products/[id]</code>
            <span className="text-gray-500">- Update product</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
              DELETE
            </span>
            <code>/api/products/[id]</code>
            <span className="text-gray-500">- Delete product</span>
          </div>
        </div>
      </div>
    </div>
  );
}
