import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { WorkOrderStatus } from '../features/work-orders/domain';
import { ProductionOrderEntity } from './production-orders.entity';
import { RoutingOperationEntity } from './routing.entity';
import { MachineEntity } from './machine.entity';
import { DowntimeEventEntity } from './downtime-events.entity';
import { ProductionEventEntity } from './production-events.entity';
import { QualityInspectionEntity } from './quality-inspection.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Work_Orders;

@Entity({ name: ETableNames.Work_Orders })
export class WorkOrderEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  workOrderNumber: string;

  @Column({ type: 'int' })
  plannedQuantity: number;

  @Column({ type: 'int', default: 0 })
  goodQuantity: number;

  @Column({ type: 'int', default: 0 })
  scrapQuantity: number;

  @Column({
    type: 'enum',
    enum: WorkOrderStatus,
    default: WorkOrderStatus.PENDING,
  })
  status: WorkOrderStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @Column({ type: 'uuid' })
  productionOrderId: string;

  @ManyToOne(() => ProductionOrderEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'productionOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Work_Orders}__${ETableNames.Production_Orders}`,
  })
  productionOrder: ProductionOrderEntity;

  @Column({ type: 'uuid', nullable: true })
  routingOperationId?: string;

  @ManyToOne(() => RoutingOperationEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'routingOperationId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Work_Orders}__${ETableNames.Routing_Opertaions}`,
  })
  routingOperation?: RoutingOperationEntity;

  @Column({ type: 'uuid', nullable: true })
  machineId?: string;

  @ManyToOne(() => MachineEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'machineId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Work_Orders}__${ETableNames.Machines}`,
  })
  machine?: MachineEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DowntimeEventEntity, (d) => d.workOrder, {
    eager: false,
    cascade: true,
  })
  downtimeEvents: DowntimeEventEntity[];

  @OneToMany(() => ProductionEventEntity, (p) => p.workOrder, {
    eager: false,
    cascade: true,
  })
  productionEvents: ProductionEventEntity[];

  @OneToMany(() => QualityInspectionEntity, (q) => q.workOrder, {
    eager: false,
    cascade: true,
  })
  qualityInspections: QualityInspectionEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.workOrder, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
