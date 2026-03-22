import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/db/db';
import { Product } from '@/app/models/Product';
import { getUserFromCookie } from '@/app/utility/responseUtils';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, price, imageUrl, category, stock } = body;
    const cookies = req.cookies;
    const userId = getUserFromCookie(cookies.get('token')?.value || '')?._id;
    // Validate required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !imageUrl ||
      !category ||
      stock === undefined
    ) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 },
      );
    }

    // Validate field types and values
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { message: 'Price must be a positive number' },
        { status: 400 },
      );
    }

    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
      return NextResponse.json(
        { message: 'Stock must be a positive integer' },
        { status: 400 },
      );
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      User: userId, // Store user ID
    });

    await newProduct.save();

    return NextResponse.json(
      {
        message: 'Product added successfully',
        product: newProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().populate('User');
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
