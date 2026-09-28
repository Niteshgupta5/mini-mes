import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  category: z.string(),
  unit: z.string(),
  status: z.string(),
  description: z.string().nullable().optional(),
});

export const productsSchema = z.array(productSchema);
