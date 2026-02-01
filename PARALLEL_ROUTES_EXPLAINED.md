# Parallel & Intercepting Routes - The Complete Guide

This is the most complex routing pattern in Next.js. Let's break it down step-by-step.

---

## The Problem We're Solving

**Scenario**: You're on Instagram. You're scrolling through your feed. You click a photo.

**Two Behaviors:**

1. **Click from Feed** → Photo opens in a **Modal** (overlay). Feed stays visible behind it.
2. **Direct Link / Refresh** → Photo opens as a **Full Page**. No feed.

**Why?** Context vs Shareability.

---

## Part 1: Parallel Routes (`@modal`)

> **Angular Equivalent**: Named Router Outlets (`<router-outlet name="sidebar">`)

### What is a "Slot"?

A **slot** is like a "second window" that can render content _alongside_ the main page.

### File Structure

```
app/
  (shop)/
    layout.tsx          ← The parent that renders BOTH slots
    products/
      page.tsx          ← Main content (the "children" slot)
    @modal/             ← The "modal" slot (@ prefix = slot)
      default.tsx       ← Fallback when slot has no match
```

### How It Works

In `layout.tsx`, we accept TWO props:

```tsx
export default function ShopLayout({
  children, // ← The main page (products/page.tsx)
  modal, // ← The @modal slot
}) {
  return (
    <div>
      {children} {/* Always renders */}
      {modal} {/* Conditionally renders */}
    </div>
  );
}
```

**Key Point**: Both `children` and `modal` render **at the same time**.

---

## Part 2: Intercepting Routes (`(.)`)

> **Angular Equivalent**: Route Guards that redirect based on navigation source

### What is "Intercepting"?

It means: **"Steal this navigation and render it somewhere else."**

### File Structure

```
app/
  (shop)/
    products/
      [slug]/
        page.tsx              ← Normal route: /products/iphone
    @modal/
      (.)products/            ← Intercepts /products/...
        [slug]/
          page.tsx            ← Renders in the @modal slot
```

### The Magic Syntax: `(.)`

- `(.)` = "Intercept routes at the **same level**"
- `(..)` = "Intercept routes **one level up**"
- `(...)` = "Intercept from **root**"

### How It Works

**When you click a Link:**

1. Next.js sees you're navigating to `/products/iphone`.
2. It checks: "Is there an intercepting route?"
3. Finds: `@modal/(.)products/[slug]/page.tsx`.
4. **Intercepts!** Renders that file in the `modal` slot instead of navigating away.

**When you refresh the page:**

1. Next.js sees the URL `/products/iphone`.
2. No "soft navigation" happened. No interception.
3. Renders the normal route: `products/[slug]/page.tsx`.

---

## Part 3: The Complete Flow

### Scenario 1: Click from Product List

**User Action**: Click "iPhone 15 Pro" card.

**What Happens:**

1. `<Link href="/products/iphone">` triggers soft navigation.
2. Next.js intercepts with `@modal/(.)products/[slug]/page.tsx`.
3. Layout receives:
   - `children` = Product List (stays the same!)
   - `modal` = Product Modal (new!)
4. **Result**: Modal appears over the list.

### Scenario 2: Refresh Page

**User Action**: Press F5 on `/products/iphone`.

**What Happens:**

1. Hard navigation (no interception).
2. Next.js renders `products/[slug]/page.tsx` normally.
3. Layout receives:
   - `children` = Product Detail (full page)
   - `modal` = `null` (no match, so `default.tsx` returns null)
4. **Result**: Full detail page.

---

## Part 4: The `default.tsx` File

### Why Do We Need It?

**Problem**: When you refresh, the URL is `/products/iphone`, but there's no `@modal/products/iphone` file (only `@modal/(.)products/iphone`).

**Solution**: `default.tsx` acts as a fallback.

```tsx
// @modal/default.tsx
export default function Default() {
  return null; // Show nothing
}
```

**Translation**: "If the modal slot doesn't match the URL, render nothing."

---

## Angular Mental Model

### Angular (Complex Way)

```typescript
// You'd need:
1. A Dialog Service
2. Route Guards to check navigation source
3. Manual state management to track "where did user come from"
4. Custom logic to show dialog vs navigate
```

### Next.js (File-Based Way)

```
1. Create @modal folder (Parallel Route)
2. Create (.)products folder (Intercepting Route)
3. Done. Next.js handles the rest.
```

---

## Visual Diagram

```
User clicks product card
        ↓
Next.js checks: "Is this a soft nav?"
        ↓
    YES → Intercept!
        ↓
Render @modal/(.)products/[slug]/page.tsx
        ↓
Layout gets: { children: List, modal: Modal }
        ↓
    RESULT: Modal overlay


User refreshes page
        ↓
Next.js checks: "Is this a soft nav?"
        ↓
    NO → Normal route
        ↓
Render products/[slug]/page.tsx
        ↓
Layout gets: { children: Detail, modal: null }
        ↓
    RESULT: Full page
```

---

## Files in Our Project

1. **[app/(shop)/layout.tsx](<./app/(shop)/layout.tsx>)** - Renders both slots
2. **[app/(shop)/@modal/default.tsx](<./app/(shop)/@modal/default.tsx>)** - Returns null (fallback)
3. **[app/(shop)/@modal/(.)products/[slug]/page.tsx](<./app/(shop)/@modal/(.)products/[slug]/page.tsx>)** - The intercepting modal
4. **[app/(shop)/products/[slug]/page.tsx](<./app/(shop)/products/[slug]/page.tsx>)** - The full page
5. **[components/Modal.tsx](./components/Modal.tsx)** - The UI wrapper

---

## Key Takeaways

1. **Parallel Routes** = Render multiple things at once (slots).
2. **Intercepting Routes** = Hijack navigation based on how user got there.
3. **Soft Nav** (click) = Interception happens.
4. **Hard Nav** (refresh) = Normal route.
5. **`default.tsx`** = Fallback when slot doesn't match URL.

This pattern is powerful but complex. Read this a few times, and trace through the code files!

---

## Technical Deep Dive: How Does Next.js Know "Soft Nav" vs "Hard Nav"?

### The Short Answer

Next.js uses **client-side routing state** to track navigation history.

### The Long Answer

#### 1. The `<Link>` Component

When you use `<Link href="/products/iphone">`:

```tsx
// What you write:
<Link href="/products/iphone">iPhone</Link>

// What Next.js does internally:
<a
  href="/products/iphone"
  onClick={(e) => {
    e.preventDefault(); // Stop browser navigation
    router.push('/products/iphone', {
      scroll: true,
      shallow: false
    });
  }}
>
  iPhone
</a>
```

**Key Point**: The `onClick` handler prevents the browser's default navigation and uses the **Next.js Router** instead.

#### 2. The Router State

Next.js maintains a **navigation stack** in memory (similar to Angular's Router):

```typescript
// Simplified internal state
{
  currentPath: '/products',
  previousPath: '/',
  navigationMethod: 'PUSH', // or 'REPLACE' or 'RELOAD'
  isClientNavigation: true  // ← This is the flag!
}
```

#### 3. The Interception Check

When you navigate to `/products/iphone`, Next.js checks:

```typescript
// Pseudo-code of what Next.js does
if (isClientNavigation === true) {
  // Soft navigation (user clicked a Link)
  // Check for intercepting routes
  const interceptor = findInterceptingRoute("(.)products/[slug]");
  if (interceptor) {
    renderInSlot("@modal", interceptor);
  }
} else {
  // Hard navigation (refresh, direct URL, bookmark)
  // Render normal route
  renderNormalRoute("products/[slug]");
}
```

#### 4. What About Refresh?

When you press F5 or type a URL directly:

1. **Browser** makes a full HTTP request to the server.
2. Next.js **server** renders the page.
3. No client-side router state exists yet.
4. `isClientNavigation` = `false`.
5. **Result**: Normal route renders, no interception.

#### 5. The History API

Under the hood, Next.js uses the browser's **History API**:

```javascript
// Soft navigation (Link click)
window.history.pushState(
  { as: "/products/iphone", url: "/products/iphone" },
  "",
  "/products/iphone",
);

// Hard navigation (refresh)
// No pushState call - browser handles it
```

### Angular Comparison

In Angular, you'd check:

```typescript
constructor(private router: Router) {
  // Check if navigation came from app
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      if (event.navigationTrigger === 'imperative') {
        // Soft nav (router.navigate())
      } else if (event.navigationTrigger === 'popstate') {
        // Browser back/forward
      }
    }
  });
}
```

Next.js does this **automatically** based on file structure.

### Visual Flow

```
User clicks <Link>
    ↓
Next.js intercepts click
    ↓
Calls router.push() (client-side)
    ↓
Sets isClientNavigation = true
    ↓
Checks for (.) routes
    ↓
FOUND → Render in @modal slot
    ↓
RESULT: Modal


User types URL / Refreshes
    ↓
Browser makes HTTP request
    ↓
Next.js server renders
    ↓
No router state (fresh page load)
    ↓
isClientNavigation = false
    ↓
Render normal route
    ↓
RESULT: Full page
```

### Key Insight

**The "magic" is not magic** - it's just:

1. Intercepting `<Link>` clicks with `onClick`.
2. Using `router.push()` instead of browser navigation.
3. Maintaining state to know "how did we get here?"
4. File-based routing to determine what to render.

The brilliance is that **you don't write this logic** - Next.js infers it from your folder structure!
