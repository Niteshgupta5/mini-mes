import { api } from './client';
import { parseResponse } from '../lib/validation';
import { dashboardSchema } from '../schemas/dashboard.schema';

import type { DashboardData } from '../types/dashboard';

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get('/dashboard/summary');

  return parseResponse(dashboardSchema, response.data, 'GET /dashboard');
}
