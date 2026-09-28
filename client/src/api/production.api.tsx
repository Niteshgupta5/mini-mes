import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const productionEventSchema = z.object({
  id: z.string(),
  workOrderId: z.string(),
  machineId: z.string().nullable().optional(),
  eventType: z.string(),
  quantity: z.number().optional(),
  goodQty: z.number().optional(),
  scrapQty: z.number().optional(),
  timestamp: z.string(),
});

const productionEventsSchema = z.array(productionEventSchema);

export async function getProductionEvents() {
  const response = await api.get('/production/events');

  return parseResponse(productionEventsSchema, response.data, 'GET /production/events');
}

export async function startProduction(workOrderId: string) {
  const response = await api.post(`/production/work-orders/${workOrderId}/start`);

  return response.data;
}

export async function pauseProduction(workOrderId: string) {
  const response = await api.post(`/production/work-orders/${workOrderId}/pause`);

  return response.data;
}

export async function completeProduction(workOrderId: string) {
  const response = await api.post(`/production/work-orders/${workOrderId}/complete`);

  return response.data;
}

export interface ReportProductionPayload {
  quantity: number;
  goodQty: number;
  scrapQty: number;
}

export async function reportProduction(workOrderId: string, payload: ReportProductionPayload) {
  const response = await api.post(`/production/work-orders/${workOrderId}/report`, payload);

  return response.data;
}
