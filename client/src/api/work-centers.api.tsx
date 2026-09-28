import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

import type { WorkCenter } from '../types/work-center';

const workCenterSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.string(),
});

const workCentersSchema = z.array(workCenterSchema);

export async function getWorkCenters(): Promise<WorkCenter[]> {
  const response = await api.get('/work-centers');

  return parseResponse(workCentersSchema, response.data, 'GET /work-centers');
}

export async function createWorkCenter(payload: Omit<WorkCenter, 'id'>): Promise<WorkCenter> {
  const response = await api.post('/work-centers', payload);

  return parseResponse(workCenterSchema, response.data, 'POST /work-centers');
}

export async function updateWorkCenter(
  id: string,
  payload: Partial<Omit<WorkCenter, 'id'>>,
): Promise<WorkCenter> {
  const response = await api.patch(`/work-centers/${id}`, payload);

  return parseResponse(workCenterSchema, response.data, `PATCH /work-centers/${id}`);
}

export async function deleteWorkCenter(id: string): Promise<void> {
  await api.delete(`/work-centers/${id}`);
}
