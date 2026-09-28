import { AuthModule } from './auth';
import { BomModule } from './bom';
import { DashboardModule } from './dashboard';
import { DowntimeModule } from './downtime';
import { MachinesModule } from './machine';
import { MaterialsModule } from './materials';
import { MqttModule } from './mqtt';
import { OeeModule } from './oee';
import { ProductsModule } from './product';
import { ProductionModule } from './production';
import { ProductionOrdersModule } from './production-orders';
import { QualityModule } from './quality';
import { ReportsModule } from './reports';
import { RoutingModule } from './routing';
import { TraceabilityModule } from './traceability';
import { UsersModule } from './user';
import { WorkCentersModule } from './work-centers';
import { WorkOrdersModule } from './work-orders';

export const Modules = [
  AuthModule,
  UsersModule,
  ProductsModule,
  BomModule,
  DashboardModule,
  DowntimeModule,
  MachinesModule,
  MaterialsModule,
  MqttModule,
  OeeModule,
  ProductionModule,
  ProductionOrdersModule,
  QualityModule,
  ReportsModule,
  RoutingModule,
  TraceabilityModule,
  WorkCentersModule,
  WorkOrdersModule,
];
