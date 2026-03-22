import { connectDB } from '@/app/db/db';
import { type UserI as UserInterface, User } from '@/app/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  await connectDB();
  const users = await User.find({}, { password: 0 });
  return NextResponse.json({ Success: true, data: users });
};

export const POST = async (req: Request) => {
  await connectDB();
  const { firstName, lastName, email, password }: UserInterface = await req.json();
  const UserModel = new User({ firstName, lastName, email, password });
  const savedModel = await UserModel.save();
  savedModel.set('password', undefined);
  return NextResponse.json({ Success: true, data: [savedModel] });
};

