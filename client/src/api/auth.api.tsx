import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.email(),
    name: z.string(),
    role: z.string(),
  }),
});

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await api.post('/auth/login', payload);

  return parseResponse(loginResponseSchema, response.data, 'POST /auth/login');
}

export function logout() {
  localStorage.removeItem('mes_token');
}
