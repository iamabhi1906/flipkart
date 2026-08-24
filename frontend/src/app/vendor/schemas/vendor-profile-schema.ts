import { z } from "zod";

export const vendorProfileSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessEmail: z
    .email("Invalid email address")
    .or(z.literal(""))
    .optional(),
  businessPhone: z.string().optional(),
  taxNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  businessDescription: z.string().optional(),
});

export type VendorProfileFormValues = z.infer<typeof vendorProfileSchema>;
