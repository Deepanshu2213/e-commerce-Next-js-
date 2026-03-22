import { connectDB } from '@/app/db/db';
import { User } from '@/app/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  await connectDB();
  await User.deleteMany({});
  return NextResponse.json({ success: true, data: [] });
};
