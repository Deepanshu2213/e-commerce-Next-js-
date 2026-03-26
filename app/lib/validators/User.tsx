import z from 'zod';

export const loginSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'please enter a valid first name')
      .max(20, 'name is too long')
      .optional(),
    lastName: z
      .string()
      .min(3, 'please enter a valid last name')
      .max(20, 'name is too long')
      .optional(),
    email: z.email(),
    password: z
      .string()
      .min(7, 'password is too short')
      .max(20, 'password is too long')
      .regex(/[a-z]/, 'Add atleast one small characters')
      .regex(/[A-Z]/, 'Add atleast one capital characters'),
    address: z.array(z.string()).optional(),
  })
  .strict();

export const userSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(3, 'please enter a valid first name')
    .max(20, 'name is too long'),

  lastName: z
    .string()
    .min(3, 'please enter a valid last name')
    .max(20, 'name is too long'),
});
export const updateUserSchema = loginSchema.partial();