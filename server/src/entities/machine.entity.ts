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
import { MachineStatus } from '../features/machine/domain';
import { WorkCenterEntity } from './work-center.entity';
import { ETableNames } from './e-table-names';
import { WorkOrderEntity } from './work-orders.entity';
import { DowntimeEventEntity } from './downtime-events.entity';
import { ProductionEventEntity } from './production-events.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Machines;

@Entity({ name: ETableNames.Machines })
export class MachineEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ type: 'enum', enum: MachineStatus, default: MachineStatus.IDLE })
  status: MachineStatus;

  @Column({ type: 'uuid', nullable: true })
  workCenterId?: string;

  @ManyToOne(() => WorkCenterEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'workCenterId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Machines}__${ETableNames.Work_Centers}`,
  })
  workCenter?: WorkCenterEntity;

  @Column({ type: 'numeric', default: 0 })
  temperature: number;

  @Column({ type: 'numeric', default: 0 })
  speed: number;

  @Column({ type: 'int', default: 0 })
  productionCount: number;

  @Column({ nullable: true })
  faultCode?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WorkOrderEntity, (wo) => wo.machine, {
    eager: false,
    cascade: true,
  })
  workOrders: WorkOrderEntity[];

  @OneToMany(() => DowntimeEventEntity, (d) => d.machine, {
    eager: false,
    cascade: true,
  })
  downtimeEvents: DowntimeEventEntity[];

  @OneToMany(() => ProductionEventEntity, (p) => p.machine, {
    eager: false,
    cascade: true,
  })
  productionEvents: ProductionEventEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.machine, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
