import Link from "next/link";

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
