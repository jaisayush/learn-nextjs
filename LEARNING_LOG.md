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

---

## Day 3: Route Handlers & Middleware (Building a REST API)

**Goal**: Learn how to build backend API endpoints directly in Next.js.

### 1. HTTP Methods (CRUD Operations)

> **Angular Equivalent**: NestJS Controllers with `@Get()`, `@Post()`, `@Patch()`, `@Delete()` decorators.

- **What**: Route Handlers let you create API endpoints by exporting functions named after HTTP methods.
- **File Pattern**: `app/api/[route]/route.ts`
- **Methods Implemented**:
  - **GET**: Fetch data (with query params support)
  - **POST**: Create new resources
  - **PATCH**: Update existing resources
  - **DELETE**: Remove resources
- **Files**:
  - [app/api/products/route.ts](./app/api/products/route.ts) - GET (list), POST (create)
  - [app/api/products/[id]/route.ts](./app/api/products/[id]/route.ts) - GET (single), PATCH, DELETE
- **How to Verify**:
  1. **GET**: Visit `http://localhost:3000/api/products`
  2. **GET with params**: `http://localhost:3000/api/products?search=iphone`
  3. **POST**: Use Thunder Client/Postman to POST to `/api/products` with JSON body:
     ```json
     {
       "name": "New Product",
       "price": 999,
       "description": "Test product"
     }
     ```

### 2. Dynamic Route Handlers

> **Angular Equivalent**: Route parameters like `@Param('id')` in NestJS.

- **What**: Use `[id]` folder to create dynamic API routes.
- **Pattern**: `/api/products/[id]` matches `/api/products/123`
- **How**: Access via `params.id` (must await params)
- **Files**: [app/api/products/[id]/route.ts](./app/api/products/[id]/route.ts)
- **How to Verify**:
  - GET: `http://localhost:3000/api/products/1`
  - PATCH: Use Thunder Client to PATCH `/api/products/1` with `{"price": 1299}`
  - DELETE: Send DELETE request to `/api/products/1`

### 3. Headers

> **Angular Equivalent**: `@Headers()` decorator in NestJS or `HttpHeaders` in Angular HttpClient.

- **What**: Read request headers and set custom response headers.
- **Use Cases**: API versioning, CORS, authentication tokens.
- **Files**: [app/api/headers/route.ts](./app/api/headers/route.ts)
- **Code Example**:

```tsx
// Reading
const userAgent = request.headers.get("user-agent");

// Setting
response.headers.set("X-API-Version", "1.0");
```

- **How to Verify**: Visit `/api/headers` and check Network tab → Headers in DevTools.

### 4. Cookies

> **Angular Equivalent**: Cookie services or `document.cookie` (but server-side here).

- **What**: Read and set HTTP cookies from API routes.
- **Use Cases**: Session management, user preferences, tracking.
- **Files**: [app/api/cookies/route.ts](./app/api/cookies/route.ts)
- **Code Example**:

```tsx
// Reading
const cookieStore = await cookies();
const pref = cookieStore.get("user-preference");

// Setting
response.cookies.set("session-id", "abc123", {
  httpOnly: true,
  maxAge: 3600,
});
```

- **How to Verify**:
  1. Visit `/api/cookies`
  2. Check Application tab → Cookies in DevTools
  3. Visit `/api/cookies` again to see cookies being read

### 5. Redirects

> **Angular Equivalent**: `this.router.navigate()` but from the server.

- **What**: Redirect users to different URLs from an API route.
- **Use Cases**: Short URLs, auth flows, legacy route handling.
- **Files**: [app/api/redirect/route.ts](./app/api/redirect/route.ts)
- **How to Verify**: Visit `/api/redirect?target=products` → redirects to `/products`

### 6. Caching

> **Angular Equivalent**: HTTP caching headers or `shareReplay()` in RxJS.

- **What**: Control how Next.js caches route handler responses.
- **Strategies**:
  - `force-static`: Cache forever (default)
  - `force-dynamic`: Never cache (re-run every request)
  - `revalidate: 60`: Cache for 60 seconds, then regenerate
- **Files**: [app/api/cache/route.ts](./app/api/cache/route.ts)
- **How to Verify**:
  1. Visit `/api/cache` multiple times
  2. Check if timestamp changes (it will, because we use `force-dynamic`)

### 7. Middleware

> **Angular Equivalent**: HTTP Interceptors.

- **What**: Code that runs BEFORE every request (pages + API routes).
- **Use Cases**: Logging, authentication, redirects, adding headers.
- **File**: [middleware.ts](./middleware.ts) (root level)
- **How It Works**:
  1. Every request hits middleware first
  2. Middleware can modify request/response or redirect
  3. Then request continues to the actual route
- **Code Example**:

```tsx
export function middleware(request: NextRequest) {
  console.log(`${request.method} ${request.url}`);
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "value");
  return response;
}
```

- **How to Verify**:
  1. Check terminal logs when navigating
  2. Check Network tab → any request → Response Headers for `X-Middleware-Applied`

---

## Day 3 Summary

**What We Built:**

- Complete REST API for products (CRUD)
- Dynamic API routes
- Header/Cookie/Redirect handling
- Caching strategies
- Request interception via Middleware

**Key Concepts:**

- Route Handlers = Backend endpoints in Next.js
- `NextRequest` = Request object (like Express `req`)
- `NextResponse` = Response object (like Express `res`)
- Middleware = Global request interceptor
