import { z } from 'zod';

export const materialSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  unit: z.string(),
  stock: z.number(),
  reorderLevel: z.number(),
  status: z.string(),
});

export const materialsSchema = z.array(materialSchema);
