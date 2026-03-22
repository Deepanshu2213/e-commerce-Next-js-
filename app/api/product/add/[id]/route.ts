import { getUserFromCookie } from '@/app/utility/responseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const cookies = req.cookies;
    const userId = getUserFromCookie(cookies.get('token')?.value || '')?._id;
    if (!userId) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 },
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
};
