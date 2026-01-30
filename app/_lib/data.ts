// CONCEPT: Private Folder
// Folders starting with '_' (underscore) are PRIVATE.
// Next.js will NOT create a route for them.
// You cannot visit '/_lib' or '/_lib/data' in the browser.
// This is perfect for utility files, helpers, and data.

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Neon Gaming Headset',
    slug: 'neon-gaming-headset',
    price: 199.99,
    description: 'Immersive sound with active noise cancellation and RGB lighting.',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    price: 129.50,
    description: 'Linear switches for swift gaming action and satisfying clicks.',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Developer Hoodie',
    slug: 'developer-hoodie',
    price: 49.99,
    description: 'Comfortable cotton blend hoodie perfect for long coding sessions.',
    category: 'Clothing',
  },
  {
    id: '4',
    name: 'USB-C Docking Station',
    slug: 'usb-c-dock',
    price: 89.00,
    description: 'Expand your connectivity with HDMI, Ethernet, and 4 USB ports.',
    category: 'Accessories',
  },
];
