import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const workOrderSchema = z.object({
  id: z.string(),
  workOrderNo: z.string(),
  productionOrderId: z.string(),
  operation: z.string(),
  workCenterId: z.string(),
  machineId: z.string().nullable().optional(),
  plannedQty: z.number(),
  completedQty: z.number(),
  status: z.string(),
});

const workOrdersSchema = z.array(workOrderSchema);

export async function getWorkOrders() {
  const response = await api.get('/work-orders');

  return parseResponse(workOrdersSchema, response.data, 'GET /work-orders');
}

export async function getWorkOrder(id: string) {
  const response = await api.get(`/work-orders/${id}`);

  return parseResponse(workOrderSchema, response.data, `GET /work-orders/${id}`);
}

export async function createWorkOrder(payload: unknown) {
  const response = await api.post('/work-orders', payload);

  return parseResponse(workOrderSchema, response.data, 'POST /work-orders');
}

export async function updateWorkOrder(id: string, payload: unknown) {
  const response = await api.patch(`/work-orders/${id}`, payload);

  return parseResponse(workOrderSchema, response.data, `PATCH /work-orders/${id}`);
}
