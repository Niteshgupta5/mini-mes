import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const reportSchema = z.object({
  id: z.string(),
  name: z.string(),
  period: z.string(),
  format: z.string(),
  status: z.string(),
  downloadUrl: z.string().optional(),
});

const reportsSchema = z.array(reportSchema);

export async function getReports() {
  const response = await api.get('/reports');

  return parseResponse(reportsSchema, response.data, 'GET /reports');
}
