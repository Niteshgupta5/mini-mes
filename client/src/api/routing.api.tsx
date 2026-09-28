import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const routingOperationSchema = z.object({
  id: z.string(),
  sequence: z.number(),
  operation: z.string(),
  workCenterId: z.string(),
  workCenterCode: z.string().optional(),
  standardTimeMinutes: z.number(),
});

const routingSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productCode: z.string().optional(),
  version: z.string(),
  status: z.string(),
  operations: z.array(routingOperationSchema),
});

const routingsSchema = z.array(routingSchema);

export async function getRoutings() {
  const response = await api.get('/routing');

  return parseResponse(routingsSchema, response.data, 'GET /routing');
}

export async function getRouting(id: string) {
  const response = await api.get(`/routing/${id}`);

  return parseResponse(routingSchema, response.data, `GET /routing/${id}`);
}

export async function createRouting(payload: unknown) {
  const response = await api.post('/routing', payload);

  return parseResponse(routingSchema, response.data, 'POST /routing');
}

export async function updateRouting(id: string, payload: unknown) {
  const response = await api.patch(`/routing/${id}`, payload);

  return parseResponse(routingSchema, response.data, `PATCH /routing/${id}`);
}

export async function deleteRouting(id: string) {
  await api.delete(`/routing/${id}`);
}
