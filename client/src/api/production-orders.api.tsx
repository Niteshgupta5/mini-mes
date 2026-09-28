import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const productionOrderSchema = z.object({
  id: z.string(),
  orderNo: z.string(),
  productId: z.string(),
  productCode: z.string().optional(),
  quantity: z.number(),
  produced: z.number(),
  scrap: z.number(),
  status: z.string(),
  dueDate: z.string(),
});

const productionOrdersSchema = z.array(productionOrderSchema);

export async function getProductionOrders() {
  const response = await api.get('/production-orders');

  return parseResponse(productionOrdersSchema, response.data, 'GET /production-orders');
}

export async function getProductionOrder(id: string) {
  const response = await api.get(`/production-orders/${id}`);

  return parseResponse(productionOrderSchema, response.data, `GET /production-orders/${id}`);
}

export async function createProductionOrder(payload: unknown) {
  const response = await api.post('/production-orders', payload);

  return parseResponse(productionOrderSchema, response.data, 'POST /production-orders');
}

export async function updateProductionOrder(id: string, payload: unknown) {
  const response = await api.patch(`/production-orders/${id}`, payload);

  return parseResponse(productionOrderSchema, response.data, `PATCH /production-orders/${id}`);
}

export async function deleteProductionOrder(id: string) {
  await api.delete(`/production-orders/${id}`);
}
