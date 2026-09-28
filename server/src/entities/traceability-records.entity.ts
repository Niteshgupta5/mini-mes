import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { MachineEntity } from './machine.entity';
import { WorkOrderEntity } from './work-orders.entity';
import { UserEntity } from './users.entity';
import { ProductionOrderEntity } from './production-orders.entity';
import { ProductEntity } from './product.entity';
import { MaterialEntity } from './material.entity';

const PK_NAME = 'PK__' + ETableNames.Traceability_Records;

@Entity({ name: ETableNames.Traceability_Records })
export class TraceabilityRecordEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  serialNumber: string;

  @Column({ nullable: true })
  materialBatch?: string;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => ProductEntity, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Products}`,
  })
  product: ProductEntity;

  @Column({ type: 'uuid' })
  productionOrderId: string;

  @ManyToOne(() => ProductionOrderEntity, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'productionOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Production_Orders}`,
  })
  productionOrder: ProductionOrderEntity;

  @Column({ type: 'uuid', nullable: true })
  workOrderId?: string;

  @ManyToOne(() => WorkOrderEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'workOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Work_Orders}`,
  })
  workOrder?: WorkOrderEntity;

  @Column({ type: 'uuid', nullable: true })
  materialId?: string;

  @ManyToOne(() => MaterialEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'materialId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Materials}`,
  })
  material?: MaterialEntity;

  @Column({ type: 'uuid', nullable: true })
  machineId?: string;

  @ManyToOne(() => MachineEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'machineId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Machines}`,
  })
  machine?: MachineEntity;

  @Column({ type: 'uuid', nullable: true })
  operatorId?: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'operatorId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Traceability_Records}__${ETableNames.Users}`,
  })
  operator?: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
