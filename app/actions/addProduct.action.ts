'use server';
import { cookies } from 'next/headers';
import {
  GetObjectFromFormData,
  getUserFromCookie,
} from '../utility/responseUtils';
import { ActionError } from '../interfaces/ErrorRes';
import { redirect } from 'next/navigation';
import { Product, ProductInt } from '../models/Product';
import { revalidatePath, revalidateTag } from 'next/cache';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { ProductSchema } from '@/middleware';
import { getKey } from '../utility/dbCallUtil';
import cloudinary from '../utility/cloudinary';
import { UploadApiResponse } from 'cloudinary';
export const addProduct = async (
  prev: any,
  formData: FormData,
): ActionError => {
  const cook = await cookies();
  const token = cook.get('token')?.value;
  const UserId = getUserFromCookie(token || '')?._id;
  if (!UserId) {
    return {
      errors: {
        error: ['User not authenticated'],
      },
    };
  }
  const file = formData.get('imageUrl') as File;
  if (!(file instanceof File) || file.size === 0) {
    return {
      errors: {
        imageUrl: ['Image is required'],
      },
    };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    },
  );
  const fileName = result?.secure_url || '';
  const productData: Omit<ProductInt, 'User'> & {
    User: string;
  } = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    imageUrl: fileName,
    category: formData.get('category') as string,
    stock: parseInt(formData.get('stock') as string, 10),
    User: UserId,
  };
  const product = new Product(productData);
  await product.save();
  revalidatePath('/products');
  redirect('/products');
};

export const updateProduct = async (
  prev: any,
  formData: FormData,
): ActionError => {
  const cook = await cookies();
  const token = cook.get('token')?.value;
  const UserId = getUserFromCookie(token || '')?._id;
  if (!UserId) {
    return {
      errors: {
        error: ['User not authenticated'],
      },
    };
  }
  let fileName = '';
  const file = formData.get('imageUrl') as File;
  if (file instanceof File && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      },
    );
    fileName = result?.secure_url || '';
  }
  const id = formData.get('id') as string;
  const productData = GetObjectFromFormData<ProductInt>(formData, [
    'name',
    'description',
    'price',
    'category',
    'stock',
  ]);
  if (fileName) {
    productData.imageUrl = fileName;
  }
  productData.stock = parseInt(productData.stock as unknown as string, 10);
  productData.price = parseFloat(productData.price as unknown as string);
  const result = ProductSchema.partial().safeParse(productData);
  if (result.success === false) {
    return {
      errors: result.error.flatten().fieldErrors || {},
    };
  }

  await Product.findByIdAndUpdate(id, productData);
  revalidatePath('/products');
  revalidatePath(`/edit-product/${id}`);
  redirect('/products');
};
