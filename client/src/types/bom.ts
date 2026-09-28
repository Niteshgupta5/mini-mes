export interface BomItem {
  id: string;
  materialId: string;
  materialCode?: string;
  materialName?: string;
  quantity: number;
  unit: string;
}

export interface Bom {
  id: string;
  productId: string;
  productCode?: string;
  productName?: string;
  version: string;
  status: string;
  items: BomItem[];
}
