import { z } from 'zod';

export function parseResponse<T>(schema: z.ZodType<T>, data: unknown, endpoint: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error(`Invalid API response from ${endpoint}`, result.error.issues);
    throw new Error(`Server returned invalid data from ${endpoint}`);
  }

  return result.data;
}
