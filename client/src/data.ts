export const machines = [
  ['MCH-001', 'Rotor Assembly', 'RUNNING', 58, 1420, 1820],
  ['MCH-002', 'Stator Winding', 'RUNNING', 62, 1180, 1412],
  ['MCH-003', 'Motor Assembly', 'IDLE', 34, 0, 980],
  ['MCH-004', 'Final Test Bench', 'FAULT', 72, 0, 744],
];
export const products = [
  ['MTR-001', 'Electric Motor 1.5kW', 'Motor', 'PCS', 'ACTIVE'],
  ['MTR-002', 'Electric Motor 2.2kW', 'Motor', 'PCS', 'ACTIVE'],
  ['PMP-001', 'Industrial Pump', 'Pump', 'PCS', 'ACTIVE'],
];
export const materials = [
  ['MAT-CU-001', 'Copper Wire', 'KG', 820, 'AVAILABLE'],
  ['MAT-ST-001', 'Steel Rotor', 'PCS', 120, 'LOW'],
  ['MAT-BR-001', 'Bearing 6204', 'PCS', 540, 'AVAILABLE'],
  ['MAT-HS-001', 'Motor Housing', 'PCS', 0, 'OUT_OF_STOCK'],
];
export const orders = [
  ['PO-1001', 'MTR-001', 500, 326, 8, 'IN_PROGRESS', '2026-09-25'],
  ['PO-1002', 'MTR-002', 250, 250, 4, 'COMPLETED', '2026-09-20'],
  ['PO-1003', 'PMP-001', 120, 0, 0, 'RELEASED', '2026-09-30'],
];
export const workOrders = [
  ['WO-1001-01', 'Rotor Assembly', 'WC-ASM-01', 'MCH-001', 500, 326, 'IN_PROGRESS'],
  ['WO-1001-02', 'Stator Winding', 'WC-WND-01', 'MCH-002', 500, 318, 'IN_PROGRESS'],
  ['WO-1002-03', 'Final Testing', 'WC-TST-01', 'MCH-004', 250, 246, 'COMPLETED'],
];
