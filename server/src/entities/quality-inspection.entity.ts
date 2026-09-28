import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { QualityResult } from '../features/quality/domain';
import { WorkOrderEntity } from './work-orders.entity';
import { UserEntity } from './users.entity';

const PK_NAME = 'PK__' + ETableNames.Quality_Inspections;

@Entity({ name: ETableNames.Quality_Inspections })
export class QualityInspectionEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ type: 'varchar' })
  parameter: string;

  @Column({ type: 'varchar' })
  measuredValue: string;

  @Column({ nullable: true })
  specification?: string;

  @Column({ type: 'enum', enum: QualityResult })
  result: QualityResult;

  @Column({ nullable: true })
  remarks?: string;

  @Column({ type: 'uuid' })
  workOrderId: string;

  @ManyToOne(() => WorkOrderEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workOrderId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Quality_Inspections}__${ETableNames.Work_Orders}`,
  })
  workOrder: WorkOrderEntity;

  @Column({ type: 'uuid', nullable: true })
  inspectorId?: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'inspectorId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Quality_Inspections}__${ETableNames.Users}`,
  })
  inspector?: UserEntity;

  @CreateDateColumn()
  inspectedAt: Date;
}
