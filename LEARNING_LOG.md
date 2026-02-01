# Next.js Learning Log (The Angular Developer's Guide)

This guide is designed for an Angular developer to learn Next.js. It maps every Next.js concept to its Angular equivalent.

---

## Day 1: Core Routing & Layouts

### 1. Route Groups `(folder)`

> **Angular Equivalent**: Lazy Loaded Modules with specific layouts (e.g., `ShopModule`, `AuthModule`).

- **What**: We organized our app into `(marketing)` and `(shop)` folders.
- **Why**: To keep code organized WITHOUT changing the URL. `app/(shop)/products` is still just `/products`.
- **Files**:
  - [app/(marketing)/page.tsx](<./app/(marketing)/page.tsx>) (Home Page)
  - [app/(shop)/layout.tsx](<./app/(shop)/layout.tsx>) (Shop Layout)

### 2. Layout Persistence

> **Angular Equivalent**: A parent `<router-outlet>` component that stays alive while children change.

- **What**: The Search Bar in the Shop Layout **does not reload** when you navigate between products.
- **Why**: Next.js (React) sees the Layout as the same component instance. It only swaps the `children` (the page content).
- **Files**: [app/(shop)/layout.tsx](<./app/(shop)/layout.tsx>)

### 3. Dynamic Routes `[slug]`

> **Angular Equivalent**: Routes with parameters like `{ path: 'products/:id', component: ProductDetail }`.

- **What**: A single page that loads dynamic data based on the URL.
- **How**: We use `await params` to get the slug.
- **Files**: [app/(shop)/products/[slug]/page.tsx](<./app/(shop)/products/[slug]/page.tsx>)

### 4. Active Links & Search Params

> **Angular Equivalent**: `routerLinkActive` directive.

- **What**: Styling links based on the current URL (e.g., highlighting the active tab).
- **How**:
  - Use `usePathname()` hook to get the current path.
  - Use `searchParams` to read query strings like `?sort=price`.
- **Files**:
  - [components/NavBar.tsx](./components/NavBar.tsx) (Active path styling)
  - [app/(shop)/products/page.tsx](<./app/(shop)/products/page.tsx>) (Search params for sorting)
- **Code Example**:

```tsx
"use client";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  return (
    <Link href="/products" className={pathname === "/products" ? "active" : ""}>
      Products
    </Link>
  );
}
```

---

## Day 2: Advanced Features (The "Deep Dive")

### 1. Server vs Client Components

### 2. Metadata (SEO)

> **Angular Equivalent**: `Title` and `Meta` services injected in a component.

- **What**: We set the `<title>` logic dynamically based on the product name.
- **Deep Dive**: In Next.js, we export a `generateMetadata` function. This runs on the server BEFORE the page renders, ensuring perfect SEO (which Angular SPA struggles with).
- **Server Components Only**: Metadata exports (`metadata` object or `generateMetadata` function) ONLY work in Server Components. If you need dynamic titles in a Client Component, you must:
  1. Pass the title as a prop from a parent Server Component, OR
  2. Use the `<title>` tag directly in the Client Component (but this hurts SEO).
- **Files**: See `generateMetadata` in [app/(shop)/products/[slug]/page.tsx](<./app/(shop)/products/[slug]/page.tsx>)
- **How to Verify**:
  1. Go to the Home Page -> Tab Title: "Welcome to NextStore".
  2. Click a product (e.g., iPhone) -> Tab Title: "iPhone 15 Pro | NextStore".

### 2. Loading UI (Suspense)

> **Angular Equivalent**: `*ngIf="isLoading"` with a `<spinner>` component.

- **What**: A Skeleton Screen that appears automatically while data fetches.
- **The Magic**: We **DO NOT** write `if (loading)` logic. We just create a file named `loading.tsx`. Next.js does the rest.
- **Files**: [app/(shop)/products/loading.tsx](<./app/(shop)/products/loading.tsx>)
- **How to Verify**:
  1. We added a 2-second artificial delay in `ProductList`.
  2. Refresh `/products`.
  3. You will see the Skeleton UI Pulse for 2 seconds before content loads.

### 3. Error Handling

> **Angular Equivalent**: Global ErrorHandler or `catchError` pipe in Observables.

- **What**: A custom error UI ("Something went wrong") with a "Try Again" button.
- **The Magic**: We just create `error.tsx`. It acts like a "catch" block for the entire page.
- **Concept: Not Found (404) vs Error (500)**
  - **notFound()**: Used when the user asks for something that _doesn't exist_ (e.g., product ID 9999). This is intentional and expected. Renders `not-found.tsx`.
  - **Error (throw)**: Used when the _system breaks_ (e.g., database connection failed, code bug). This is unexpected. Renders `error.tsx`.
  - **Why separate?**: You don't want to show a "Try Again" button for a missing product (it won't appear magically). You want to show "Go back home".
- **Files**: [app/(shop)/products/[slug]/error.tsx](<./app/(shop)/products/[slug]/error.tsx>)
- **How to Verify**:
  1. Go to any product page (e.g., `/products/iphone`).
  2. Add `?error=true` to the URL -> `/products/iphone?error=true`.
  3. You will see the Red Error UI.
  4. Click "Try Again". It will try to re-render. If the URL still has `?error=true`, it will fail again. Remove it to recover.

### 4. Templates vs Layouts

> **Angular Equivalent**: Components that re-initialize on every route change (no `OnPush` strategy).

- **What**: A `template.tsx` file that wraps pages but **re-mounts on every navigation**.
- **Difference from Layout**:
  - **Layout**: Persists across navigation (state survives).
  - **Template**: Destroys and recreates on every navigation (state resets).
- **Use Cases**:
  - Enter/exit animations (Framer Motion)
  - Logging page views (`useEffect` runs every time)
  - Resetting form state per page
- **Files**: [app/(shop)/template.tsx](<./app/(shop)/template.tsx>)
- **How to Verify**:
  1. Open browser console.
  2. Navigate between `/products` and a product detail.
  3. You'll see "Template mounted!" log on every navigation.

### 5. Programmatic Navigation

> **Angular Equivalent**: `this.router.navigate(['/path'])`

- **What**: Navigate using code instead of `<Link>` tags.
- **When to Use**: After form submission, conditional redirects, or timed navigation.
- **How**: Use the `useRouter()` hook from `next/navigation`.
- **Files**: [components/BuyButton.tsx](./components/BuyButton.tsx)
- **Code Example**:

```tsx
"use client";
import { useRouter } from "next/navigation";

function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    // Do some logic
    router.push("/products"); // Navigate!
  };
}
```

- **How to Verify**:
  1. Go to any product detail page.
  2. Click the "Buy Now" button.
  3. You'll see an alert, then navigate to home.

### 6. Parallel & Intercepting Routes (The "Instagram Modal")

> **Angular Equivalent**: Complex routing configurations with named outlets (`<router-outlet name="modal">`) or a global Dialog Service.

- **What**: Clicking a product opens a Modal. Refreshing the page opens the Full Page.
- **Why**:
  - **Context (Click)**: Keep the list visible behind the modal (don't lose scroll position).
  - **Shareability (Refresh)**: Direct link should show the full page (no context needed).
- **How It Works**:
  1.  **Parallel Route (`@modal`)**: A "slot" that renders alongside the main page.
  2.  **Intercepting Route (`(.)products`)**: "Steals" navigation when you click a link (soft nav).
  3.  **Soft Nav** (click Link) → Renders in `@modal` slot → Modal appears.
  4.  **Hard Nav** (refresh) → Renders normal route → Full page appears.
- **Files**:
  - [app/(shop)/layout.tsx](<./app/(shop)/layout.tsx>) (Renders the `@modal` slot)
  - [app/(shop)/@modal/(.)products/[slug]/page.tsx](<./app/(shop)/@modal/(.)products/[slug]/page.tsx>) (The intercepting modal)
  - [components/Modal.tsx](./components/Modal.tsx) (The UI wrapper)
- **How to Verify (The "Instagram Effect")**:
  1. **Soft Nav**: Go to `/products`. Click a product. It opens in a **Modal**. (Background is still the list).
  2. **Hard Nav**: Refresh the page. The Modal disappears, and you are on the **Full Detail Page**.

> **📖 Deep Dive**: This is the most complex routing pattern. For a complete step-by-step explanation with diagrams and technical details, see [PARALLEL_ROUTES_EXPLAINED.md](./PARALLEL_ROUTES_EXPLAINED.md).

#### Bonus: Conditional Routes & Unmatched Routes

- **What**: Using `default.tsx` to handle "unmatched" parallel route slots.
- **Why**: When you refresh a page, the URL might not match the intercepting route. `default.tsx` acts as a fallback.
- **Example**: `/products/iphone` on refresh doesn't match `@modal/(.)products/iphone`, so `@modal/default.tsx` renders (returns `null`).
- **Files**: [app/(shop)/@modal/default.tsx](<./app/(shop)/@modal/default.tsx>)
- **Concept**: This IS "conditional routing" - the route conditionally renders based on navigation type.

### 7. API Routes (Route Handlers)

> **Angular Equivalent**: You usually need a separate backend (NestJS, Express).

- **What**: Next.js allows you to write backend API endpoints inside the frontend project.
- **How**: Create a `route.ts` file and export HTTP method functions (`GET`, `POST`, etc.).
- **Files**: [app/api/products/route.ts](./app/api/products/route.ts)
- **How to Verify**: Visit `http://localhost:3000/api/products` in your browser. You'll see JSON data.
