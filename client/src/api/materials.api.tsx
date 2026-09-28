import { api } from './client';
import { parseResponse } from '../lib/validation';
import { materialSchema, materialsSchema } from '../schemas/material.schema';

import type { Material } from '../types/material';

export async function getMaterials(): Promise<Material[]> {
  const response = await api.get('/materials');

  return parseResponse(materialsSchema, response.data, 'GET /materials');
}

export async function getMaterial(id: string): Promise<Material> {
  const response = await api.get(`/materials/${id}`);

  return parseResponse(materialSchema, response.data, `GET /materials/${id}`);
}

export async function createMaterial(payload: Omit<Material, 'id'>): Promise<Material> {
  const response = await api.post('/materials', payload);

  return parseResponse(materialSchema, response.data, 'POST /materials');
}

export async function updateMaterial(
  id: string,
  payload: Partial<Omit<Material, 'id'>>,
): Promise<Material> {
  const response = await api.patch(`/materials/${id}`, payload);

  return parseResponse(materialSchema, response.data, `PATCH /materials/${id}`);
}

export async function deleteMaterial(id: string): Promise<void> {
  await api.delete(`/materials/${id}`);
}
