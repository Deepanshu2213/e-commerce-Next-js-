import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import z from './node_modules/zod/v4/classic/external.cjs';
const PUBLIC_ROUTES = ['/', '/login', '/forgot', '/signup'];
interface tokenPayload {
  id?: string;
  email?: string;
}
// const verifyToken = async (token: string): Promise<tokenPayload> => {
//   const user = new Promise<tokenPayload>((res, rej) => {
//     if (!process.env.SECRET_KEY) {
//       return rej(false);
//     }
//     verify(
//       token,
//       process.env.SECRET_KEY,
//       (err: Object | null, decoded: Object | undefined) => {
//         if (err) rej(err);
//         else {
//           res(decoded as tokenPayload);
//         }
//       },
//     );
//   });
//   return await user;
// };
export default async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    if (PUBLIC_ROUTES.includes(pathname)) {
      console.log('pathname is ', pathname);
      return NextResponse.next();
    }
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }
    const token = request.cookies.get('token')?.value || null;
    if (!token) {
      throw new Error('validation failed');
    }
    const { payload: user } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY!),
    );
    if (!user) {
      throw new Error('validation failed');
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url), 307);
  }
}
export const ProductSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name must be less than 100 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
    price: z.number().positive('Price must be a positive number'),
    imageUrl: z.string(),
    category: z
      .string()
      .min(3, 'Category must be at least 3 characters')
      .max(50, 'Category must be less than 50 characters'),
    stock: z
      .number()
      .int()
      .min(3)
      .nonnegative('Stock must be a non-negative integer'),
    userId: z.string(),
  })
  .strict();
