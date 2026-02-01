// CONCEPT: Route Groups
// The directory '(shop)' is a Route Group.
// The parenthesis () mean it is CLEARED from the URL.
// So the URL is just '/products', NOT '/shop/products'.
// This lets us create a layout ONLY for shop pages.

export default function ShopLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Shop Layout <span className="text-blue-600">(Persisting)</span>
              </h2>
              {/* CONCEPT: Layout Persistence */}
              {/* This input is in the Layout, not the Page. */}
              {/* When you navigate between products, this Layout STAYS mounted. */}
              {/* So the text you type here will NOT be lost! */}
              <p className="text-xs text-gray-500">
                This layout wraps all shop pages. Type below to test
                persistence!
              </p>
            </div>
            <input
              type="text"
              placeholder="Type here..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
      <main className="max-w-5xl mx-auto">
        {children}
        {/* CONCEPT: Parallel Route Slot */}
        {/* This will render 'app/(shop)/@modal/page.tsx' (or interceptor) */}
        {modal}
      </main>
    </div>
  );
}
