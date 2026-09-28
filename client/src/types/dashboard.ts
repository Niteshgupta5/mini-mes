export interface DashboardCounts {
  products: number;
  materials: number;
  machines: number;
  productionOrders: number;
  workOrders: number;
  downtimeEvents: number;
  inspections: number;
}

export interface DashboardMachine {
  code: string;
  name: string;
  status: string;
}

export interface DashboardProduction {
  planned: number;
  produced: number;
  good: number;
  scrap: number;
}

export interface DashboardData {
  counts: DashboardCounts;
  machineStatus: DashboardMachine[];
  production: DashboardProduction;
}
