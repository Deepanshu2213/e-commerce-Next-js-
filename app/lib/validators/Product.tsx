import z from "zod";

export const ProductItemSchema = z.object({
    Product: z.string().min(1, 'Please select a product'),
    quantity: z.number().min(1, 'Please select a quantity'),
    Price: z.number().min(1, 'Price is not correct'),
    name: z.string().min(1, 'Please select a product'),
    image: z.string().min(1, 'Please select a product'),
    description: z.string().min(1, 'Please select a product'),
}).strict()

export const ProductItemsSchema = z.array(ProductItemSchema);

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
