import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variant name is required"),
  sku: z.string().optional(),
  price: z.number().optional(),
  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  attributes: z.record(z.string(), z.string()).optional(),
});

export const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Please select a category"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  compareAtPrice: z.number().optional(),
  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
  sku: z.string().optional(),
  status: z.enum(["active", "draft"]),
  imageUrls: z.array(z.string()),
  variants: z.array(productVariantSchema).optional(),
});

export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
