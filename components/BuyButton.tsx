"use client";

import { useRouter } from "next/navigation";

// CONCEPT: Programmatic Navigation (useRouter)
// Sometimes <Link> isn't enough (e.g., after a form submit or logic check).
// We use 'useRouter' hook from 'next/navigation'.
// NOTE: Must be a Client Component ('use client').

export default function BuyButton() {
  const router = useRouter();

  const handleBuy = () => {
    // Perform some logic (e.g., add to cart, analytics)
    console.log("Adding to cart...");

    // Navigate programmatically
    alert("Thanks for buying! Redirecting to home...");
    router.push("/");
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
    >
      Buy Now (useRouter Demo)
    </button>
  );
}
