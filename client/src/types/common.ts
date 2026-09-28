export type Id = string;

export interface ApiMessage {
  message: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
