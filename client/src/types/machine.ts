export interface Machine {
  id: string;
  code: string;
  name: string;
  workCenterId: string;
  workCenterName?: string;
  status: string;
  temperature?: number;
  speed?: number;
  productionCount?: number;
  fault?: string | null;
}
