import { api } from './client';
import { parseResponse } from '../lib/validation';
import { machineSchema, machinesSchema } from '../schemas/machine.schema';

import type { Machine } from '../types/machine';

export async function getMachines(): Promise<Machine[]> {
  const response = await api.get('/machines');

  return parseResponse(machinesSchema, response.data, 'GET /machines');
}

export async function getMachine(id: string): Promise<Machine> {
  const response = await api.get(`/machines/${id}`);

  return parseResponse(machineSchema, response.data, `GET /machines/${id}`);
}

export async function createMachine(payload: Omit<Machine, 'id'>): Promise<Machine> {
  const response = await api.post('/machines', payload);

  return parseResponse(machineSchema, response.data, 'POST /machines');
}

export async function updateMachine(
  id: string,
  payload: Partial<Omit<Machine, 'id'>>,
): Promise<Machine> {
  const response = await api.patch(`/machines/${id}`, payload);

  return parseResponse(machineSchema, response.data, `PATCH /machines/${id}`);
}

export async function deleteMachine(id: string): Promise<void> {
  await api.delete(`/machines/${id}`);
}
