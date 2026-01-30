# Next.js Learning Log

This document tracks our daily progress. For each day, we record **What** we built, **How** we built it, and **Why** (the deep concept).

## Day 1: Routing & Layouts

**Goal**: Build the core structure of the Product Viewer ("Amazon Lite").

### 1. Route Groups `(folder)`

- **What**: We organized our app into `(marketing)` and `(shop)` folders.
- **How**: Surrounded folder names with parenthesis `()`. Moved `page.tsx` into `(marketing)`.
- **Deep Dive**:
  - In standard file-system routing, every folder segment becomes part of the URL path (e.g., `app/shop/products` -> `/shop/products`).
  - **Route Groups** allow you to break out of this rule. `app/(shop)/products` maps to `/products`.
  - **Why it matters**: It lets you organize code logically (e.g., keeping marketing pages separate from app pages) without introducing ugly URLs like `/marketing/home` or `/shop/products`. It also allows different **Root Layouts** for different groups (though we are using one Root Layout here).

### 2. Private Folders `_folder`

- **What**: We created `_lib` for our safe data files.
- **How**: Added an underscore `_` prefix to the folder name.
- **Deep Dive**:
  - Next.js treats every folder in `app` as a potential route.
  - If you want to keep helper functions, components, or data files _co-located_ with your pages, you need a way to tell Next.js "This is NOT a page".
  - **Why it matters**: Safety. If you named it `lib/data.ts`, a user visiting `/lib` might get an error or a 404, but it's cleaner to explicitly exclude it from the router entirely. It establishes a clear boundary between "Routing Code" and "Implementation Code".

### 3. Layout Persistence

- **What**: We created a Shop Layout that keeps the search bar text alive while navigating.
- **How**: Created `app/(shop)/layout.tsx` wrapping the products.
- **Deep Dive**:
  - **The React Tree**: When you navigate from `/products` to `/products/iphone`, Next.js compares the component tree.
  - **Scenario 1 (Using Layouts)**: `ShopLayout` stays at the top. React sees it's the _same component instance_. It **keeps it alive** (does not unmount). Only the `children` (page) inside it change. **State (input text) is saved.**
  - **Scenario 2 (Using Child Component)**: If you just added `<Header>` inside every `page.tsx`, React sees: `PageA -> Header` vs `PageB -> Header`. Since `PageA` is destroyed to make room for `PageB`, the `Header` inside it is _also_ destroyed and re-created. **State (input text) is lost.**
  - **Verdict**: You _must_ use Layouts if you want state to survive navigation.

### 4. Dynamic Routes `[slug]`

- **What**: We built a single page that handles infinite product variations.
- **How**: Created folder `[slug]` and used `await params`.
- **Deep Dive**:
  - `[slug]` is a wildcard. It matches `/products/1`, `/products/abc`, etc.
  - **Async Params**: In Next.js 15, route parameters are asynchronous promises. You cannot access `params.slug` directly; you must `await params` first.
  - **Why it matters**: This aligns with the future of React where data dependencies (even URL params) might need to be awaited before rendering, allowing for more concurrent capabilities.

### 5. Server vs Client Components

- **Concept**:
  - **Server Components (`page.tsx`)**: Run _only_ on the server. They have zero JavaScript bundle size for the browser. They can read databases directly.
  - **Client Components (`NavBar.tsx`)**: Opt-in with `'use client'`. They are sent to the browser and can use state (`useState`) and effects (`useEffect`).
  - **Why it matters**: Performance. We default to Server Components for content (text, images) to be fast/SEO-friendly, and only use Client Components for interactivity (clicks, navigation hooks).
