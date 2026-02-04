// CONCEPT: Dynamic Route Handlers
// The [id] folder makes this a dynamic route: /api/products/123
// The 'params' argument contains the dynamic segment value

import { NextRequest, NextResponse } from 'next/server';
import { products } from '../../../_lib/data';

type Props = {
  params: Promise<{ id: string }>;
};

// CONCEPT: GET (Single Product)
// Fetch a single product by ID
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// CONCEPT: PATCH (Update Product)
// Partially update a product
export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();

    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update only provided fields
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: products[productIndex].id, // Prevent ID change
    };

    products[productIndex] = updatedProduct;

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}

// CONCEPT: DELETE (Delete Product)
// Remove a product from the list
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }

  // Remove product
  products.splice(productIndex, 1);

  // Return 204 No Content (standard for successful DELETE)
  return new NextResponse(null, { status: 204 });
}
