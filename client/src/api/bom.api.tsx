import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const bomItemSchema = z.object({
  id: z.string(),
  materialId: z.string(),
  materialCode: z.string().optional(),
  materialName: z.string().optional(),
  quantity: z.number(),
  unit: z.string(),
});

const bomSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productCode: z.string().optional(),
  productName: z.string().optional(),
  version: z.string(),
  status: z.string(),
  items: z.array(bomItemSchema),
});

const bomsSchema = z.array(bomSchema);

export async function getBoms() {
  const response = await api.get('/bom');

  return parseResponse(bomsSchema, response.data, 'GET /bom');
}

export async function getBom(id: string) {
  const response = await api.get(`/bom/${id}`);

  return parseResponse(bomSchema, response.data, `GET /bom/${id}`);
}

export async function createBom(payload: unknown) {
  const response = await api.post('/bom', payload);

  return parseResponse(bomSchema, response.data, 'POST /bom');
}

export async function updateBom(id: string, payload: unknown) {
  const response = await api.patch(`/bom/${id}`, payload);

  return parseResponse(bomSchema, response.data, `PATCH /bom/${id}`);
}

export async function deleteBom(id: string) {
  await api.delete(`/bom/${id}`);
}
