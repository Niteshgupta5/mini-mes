import { z } from 'zod';

export const machineSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  workCenterId: z.string(),
  workCenterName: z.string().optional(),
  status: z.string(),
  temperature: z.number().optional(),
  speed: z.number().optional(),
  productionCount: z.number().optional(),
  fault: z.string().nullable().optional(),
});

export const machinesSchema = z.array(machineSchema);
