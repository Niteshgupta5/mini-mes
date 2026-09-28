import { z } from 'zod';

export const dashboardSchema = z.object({
  counts: z.object({
    products: z.number(),
    materials: z.number(),
    machines: z.number(),
    productionOrders: z.number(),
    workOrders: z.number(),
    downtimeEvents: z.number(),
    inspections: z.number(),
  }),

  machineStatus: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      status: z.string(),
    }),
  ),

  production: z.object({
    planned: z.number(),
    produced: z.number(),
    good: z.number(),
    scrap: z.number(),
  }),
});
