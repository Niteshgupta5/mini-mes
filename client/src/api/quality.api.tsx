import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const qualitySchema = z.object({
  id: z.string(),
  inspectionNo: z.string(),
  workOrderId: z.string(),
  productId: z.string(),
  result: z.string(),
  inspectedQty: z.number(),
  rejectedQty: z.number(),
  inspectorName: z.string().optional(),
  date: z.string(),
});

const qualityListSchema = z.array(qualitySchema);

export async function getQualityInspections() {
  const response = await api.get('/quality');

  return parseResponse(qualityListSchema, response.data, 'GET /quality');
}

export async function createQualityInspection(payload: unknown) {
  const response = await api.post('/quality', payload);

  return parseResponse(qualitySchema, response.data, 'POST /quality');
}

export async function updateQualityInspection(id: string, payload: unknown) {
  const response = await api.patch(`/quality/${id}`, payload);

  return parseResponse(qualitySchema, response.data, `PATCH /quality/${id}`);
}
