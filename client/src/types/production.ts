export interface ProductionOrder {
  id: string;
  orderNo: string;
  productId: string;
  productCode?: string;
  quantity: number;
  produced: number;
  scrap: number;
  status: string;
  dueDate: string;
}

export interface WorkOrder {
  id: string;
  workOrderNo: string;
  productionOrderId: string;
  operation: string;
  workCenterId: string;
  machineId?: string | null;
  plannedQty: number;
  completedQty: number;
  status: string;
}

export interface ProductionEvent {
  id: string;
  workOrderId: string;
  machineId?: string | null;
  eventType: string;
  quantity?: number;
  goodQty?: number;
  scrapQty?: number;
  timestamp: string;
}
