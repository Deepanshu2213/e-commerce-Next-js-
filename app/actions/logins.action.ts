'use server';

import { redirect } from 'next/navigation';
import { User } from '../models/User';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectDB } from '../db/db';
import { loginSchema, userSchema } from '../lib/validators/User';
import { ActionError } from '../interfaces/ErrorRes';

export const loginFormSubmit = async (
  prevState: any,
  formData: FormData,
): ActionError => {
  //const issues = new Map<string, string[]>();
  const rawUser = Object.fromEntries(formData);

  const user = Object.fromEntries(
    Object.entries(rawUser).filter(([key]) => !key.startsWith('$')),
  );
  const safeUser = loginSchema.safeParse(user);
  if (!safeUser.success) {
    return {
      errors: safeUser.error.flatten().fieldErrors,
    };
  }
  const { email, password } = safeUser.data;
  try {
    await connectDB();
    const user = await User.login(email as string, password as string);
    if (user) {
      const cookie = sign(user.toJSON(), process.env.SECRET_KEY as string, {
        expiresIn: 60 * 60 * 5,
      });
      const cook = await cookies();
      cook.set('token', cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  } catch (err) {
    console.error(err);
  }
  redirect('/');
};

export const signUpFormSubmit = async (
  prevState: any,
  formData: FormData,
): Promise<{
  errors: Record<string, string[] | undefined>;
}> => {
  try {
    await connectDB();
    let userInput = Object.fromEntries(formData);
    const safeUser = userSchema.safeParse(userInput);
    if (!safeUser.success) {
      return {
        errors: safeUser.error.flatten().fieldErrors,
      };
    }
    const user = safeUser.data;
    const userModel = new User(user);
    await userModel.save();
    const signedToken = sign(
      userModel.toJSON(),
      process.env.SECRET_KEY as string,
      {
        expiresIn: 60 * 60 * 5,
      },
    );
    const cook = await cookies();
    cook.set('token', signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err) {
    return {
      errors: {
        error: [
          'An error occurred while creating the account. Please try again.',
        ],
      },
    };
  }

  redirect('/dashboard');
};

export const logout = async () => {
  const cook = await cookies();
  cook.delete('token');
  redirect('/login');
};