export interface RoutingOperation {
  id: string;
  sequence: number;
  operation: string;
  workCenterId: string;
  workCenterCode?: string;
  standardTimeMinutes: number;
}

export interface Routing {
  id: string;
  productId: string;
  productCode?: string;
  version: string;
  status: string;
  operations: RoutingOperation[];
}
