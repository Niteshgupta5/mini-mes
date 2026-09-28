import { api } from './client';
import { parseResponse } from '../lib/validation';
import { productSchema, productsSchema } from '../schemas/product.schema';

import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  const response = await api.get('/products');

  return parseResponse(productsSchema, response.data, 'GET /products');
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);

  return parseResponse(productSchema, response.data, `GET /products/${id}`);
}

export async function createProduct(payload: CreateProductRequest): Promise<Product> {
  const response = await api.post('/products', payload);

  return parseResponse(productSchema, response.data, 'POST /products');
}

export async function updateProduct(id: string, payload: UpdateProductRequest): Promise<Product> {
  const response = await api.patch(`/products/${id}`, payload);

  return parseResponse(productSchema, response.data, `PATCH /products/${id}`);
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
