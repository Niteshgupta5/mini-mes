import { BomEntity, BomItemsEntity } from './bom.entity';
import { DowntimeEventEntity } from './downtime-events.entity';
import { MachineEntity } from './machine.entity';
import { MaterialEntity } from './material.entity';
import { ProductEntity } from './product.entity';
import { ProductionEventEntity } from './production-events.entity';
import { ProductionOrderEntity } from './production-orders.entity';
import { QualityInspectionEntity } from './quality-inspection.entity';
import { RoutingEntity, RoutingOperationEntity } from './routing.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';
import { UserEntity } from './users.entity';
import { WorkCenterEntity } from './work-center.entity';
import { WorkOrderEntity } from './work-orders.entity';

export * from './users.entity';
export * from './product.entity';
export * from './bom.entity';
export * from './material.entity';
export * from './work-center.entity';
export * from './machine.entity';
export * from './downtime-events.entity';
export * from './production-events.entity';
export * from './production-orders.entity';
export * from './quality-inspection.entity';
export * from './routing.entity';
export * from './traceability-records.entity';
export * from './work-orders.entity';

export default [
  UserEntity,
  ProductEntity,
  MaterialEntity,
  WorkCenterEntity,
  MachineEntity,
  BomEntity,
  BomItemsEntity,
  DowntimeEventEntity,
  ProductionEventEntity,
  ProductionOrderEntity,
  QualityInspectionEntity,
  RoutingEntity,
  RoutingOperationEntity,
  TraceabilityRecordEntity,
  WorkOrderEntity,
];
