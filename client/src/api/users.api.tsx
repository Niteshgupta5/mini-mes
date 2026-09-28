import { api } from './client';
import { parseResponse } from '../lib/validation';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  status: z.string(),
});

const usersSchema = z.array(userSchema);

export async function getUsers() {
  const response = await api.get('/users');

  return parseResponse(usersSchema, response.data, 'GET /users');
}
