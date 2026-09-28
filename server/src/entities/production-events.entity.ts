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

const PK_NAME = 'PK__' + ETableNames.Production_Events;

@Entity({ name: ETableNames.Production_Events })
export class ProductionEventEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ type: 'varchar' })
  eventType: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ nullable: true })
  reason?: string;

  @Column({ type: 'uuid', nullable: true })
  machineId?: string;

  @ManyToOne(() => MachineEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'machineId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Production_Events}__${ETableNames.Machines}`,
  })
  machine?: MachineEntity;

  @Column({ type: 'uuid' })
  workOrderId: string;

  @ManyToOne(() => WorkOrderEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Production_Events}__${ETableNames.Work_Orders}`,
  })
  workOrder: WorkOrderEntity;

  @Column({ type: 'uuid', nullable: true })
  operatorId?: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'operatorId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Production_Events}__${ETableNames.Users}`,
  })
  operator?: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
