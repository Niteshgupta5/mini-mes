import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const traceabilitySchema = z.object({
  serial: z.string(),
  productCode: z.string(),
  productionOrderNo: z.string(),
  materialBatches: z.array(z.string()),
  machineCodes: z.array(z.string()),
  operatorName: z.string().optional(),
  qualityResult: z.string().optional(),
});

export async function getTraceability(serial: string) {
  const response = await api.get(`/traceability/${encodeURIComponent(serial)}`);

  return parseResponse(traceabilitySchema, response.data, `GET /traceability/${serial}`);
}
