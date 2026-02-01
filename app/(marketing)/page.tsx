import Link from "next/link";
import { Metadata } from "next";

// CONCEPT: Static Metadata
// We export a 'metadata' object to define the <head> tags (title, description).
// This ONLY works in Server Components.
// For Client Components ('use client'), you cannot export metadata.
export const metadata: Metadata = {
  title: "Welcome to NextStore",
  description: "The best place to learn Next.js routing patterns.",
};

// CONCEPT: Route Groups & Page Structure
// This page is inside 'app/(marketing)/page.tsx'.
// But `(marketing)` is ignored, so this is the homepage at '/'.
export default function Home() {
  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold mb-6">Welcome to NextStore</h1>
      <p className="mb-8 text-xl">This is the Home Page (/).</p>

      <Link href="/products" className="text-blue-600 underline text-xl">
        Go to Shop (/products)
      </Link>
    </div>
  );
}
