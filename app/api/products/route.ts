// CONCEPT: Route Handlers (API Routes)
// Route Handlers are Next.js's way of creating backend API endpoints.
// They replace the old "pages/api" pattern from Next.js 12.
// Each HTTP method is exported as a named function: GET, POST, PATCH, DELETE, etc.

import { NextRequest, NextResponse } from 'next/server';
import { products } from '../../_lib/data';

// CONCEPT: GET Handler
// Handles HTTP GET requests to /api/products
// We can read query params from the request URL
export async function GET(request: NextRequest) {
  // Read query parameters from URL
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filteredProducts = [...products];

  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Search by name if provided
  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts,
    timestamp: new Date().toISOString(),
  });
}

// CONCEPT: POST Handler
// Handles HTTP POST requests to /api/products
// Used to create new products
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body from request
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = {
      id: `${products.length + 1}`,
      slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      name: body.name,
      price: body.price,
      description: body.description || 'No description provided',
      category: body.category || 'general',
    };

    // In a real app, you'd save to database here
    // For demo, we'll just return the created product
    products.push(newProduct);

    // Return 201 Created status
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
