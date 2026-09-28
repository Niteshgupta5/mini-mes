import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { DowntimeCategory } from '../features/downtime/domain';
import { MachineEntity } from './machine.entity';
import { WorkOrderEntity } from './work-orders.entity';

const PK_NAME = 'PK__' + ETableNames.Downtime_Events;

@Entity({ name: ETableNames.Downtime_Events })
export class DowntimeEventEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ type: 'enum', enum: DowntimeCategory })
  category: DowntimeCategory;

  @Column()
  reason: string;

  @Column({ type: 'timestamptz' })
  startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endedAt?: Date;

  @Column({ type: 'int', default: 0 })
  durationSeconds: number;

  @Column({ type: 'uuid' })
  machineId: string;

  @ManyToOne(() => MachineEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'machineId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Downtime_Events}__${ETableNames.Machines}`,
  })
  machine: MachineEntity;

  @Column({ type: 'uuid', nullable: true })
  workOrderId?: string;

  @ManyToOne(() => WorkOrderEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'workOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Downtime_Events}__${ETableNames.Work_Orders}`,
  })
  workOrder?: WorkOrderEntity;

  @CreateDateColumn()
  createdAt: Date;
}
