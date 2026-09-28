import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const downtimeSchema = z.object({
  id: z.string(),
  machineId: z.string(),
  machineCode: z.string().optional(),
  reason: z.string(),
  category: z.string(),
  durationMinutes: z.number(),
  start: z.string(),
  end: z.string().nullable().optional(),
});

const downtimeListSchema = z.array(downtimeSchema);

export async function getDowntimeRecords() {
  const response = await api.get('/downtime');

  return parseResponse(downtimeListSchema, response.data, 'GET /downtime');
}

export async function createDowntime(payload: unknown) {
  const response = await api.post('/downtime', payload);

  return parseResponse(downtimeSchema, response.data, 'POST /downtime');
}

export async function updateDowntime(id: string, payload: unknown) {
  const response = await api.patch(`/downtime/${id}`, payload);

  return parseResponse(downtimeSchema, response.data, `PATCH /downtime/${id}`);
}
