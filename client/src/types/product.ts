export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  status: string;
  description?: string | null;
}

export interface CreateProductRequest {
  code: string;
  name: string;
  category: string;
  unit: string;
  description?: string;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;
