export interface Traceability {
  serial: string;
  productCode: string;
  productionOrderNo: string;
  materialBatches: string[];
  machineCodes: string[];
  operatorName?: string;
  qualityResult?: string;
}
