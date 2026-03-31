import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
const PUBLIC_ROUTES = ['/login', '/forgot', '/signup'];
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
