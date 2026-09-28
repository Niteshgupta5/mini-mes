import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const oeeSchema = z.object({
  machineId: z.string(),
  machineCode: z.string().optional(),
  availability: z.number(),
  performance: z.number(),
  quality: z.number(),
  oee: z.number(),
});

const oeeListSchema = z.array(oeeSchema);

export async function getOee() {
  const response = await api.get('/oee');

  return parseResponse(oeeListSchema, response.data, 'GET /oee');
}
