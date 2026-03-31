import { Document } from 'mongoose';
import { NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
export const setCookie = <T extends Document>(
  entity: T,
  res: NextResponse,
): NextResponse => {
  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined in env');
  }
  const cookie = sign(entity.toJSON(), process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 5,
  });
  res.cookies.set('token', cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
};

export const getUserFromCookie = (token: string): { _id: string } | null => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined in env');
  }
  try {
    const decoded = verify(token, secretKey) as { _id: string };
    return decoded;
  } catch (error) {
    return null;
  }
};
export const GetErrorElements = (
  fieldName: string,
  errors: Record<string, string[] | undefined>,
) => {
  return (
    errors[fieldName] &&
    Object.keys(errors[fieldName]).length > 0 &&
    Object.entries(errors[fieldName]).map(([key, value], idx) => {
      return (
        <p key={key + idx} className="text-red-600 p-1">
          {value}
        </p>
      );
    })
  );
};

export const GetObjectFromFormData = <T,>(
  formData: FormData,
  keys: (keyof T)[],
) => {
  const obj: Partial<T> = {};
  for (const key of keys) {
    const value = formData.get(key as string);
    obj[key] = value as T[typeof key];
  }
  return obj as T;
};

export const sanatizePayload = <T,>(payload: T): T => {
  return JSON.parse(JSON.stringify(payload));
};

export const getUserId = async (
  cookie: ReadonlyRequestCookies,
): Promise<string | undefined> => {
  const token = cookie.get('token')?.value;
  const UserId = getUserFromCookie(token || '')?._id;
  return UserId;
};
export const getGooleAuthUrl = () => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.VITE_PUBLIC_OAUTH_ENDPOINT,
    client_id: process.env.VITE_GOOGLE_CLIENT_ID,
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
  };
  const qs = new URLSearchParams(options as any);
  return `${baseUrl}?${qs.toString()}`;
};

export const isValidResponse = async <T,>(response: Response) => {
  const data = await response.json();
  const error: Record<string, string[]> = {}
  if (!response.ok) {
    if (Object.keys(data.errors).length <= 0) {
      error['ERROR'] = [`Failed: ${response.status}`];
    }
  }
  return { data: data as T, error: data.errors || error }; // only once ✅
};
