import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { UserRole } from '../features/user/domain';
import { ProductionEventEntity } from './production-events.entity';
import { QualityInspectionEntity } from './quality-inspection.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Users;

@Entity({ name: ETableNames.Users })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  passwordHash: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.OPERATOR })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductionEventEntity, (p) => p.operator, {
    eager: false,
    cascade: true,
  })
  productionEvents: ProductionEventEntity[];

  @OneToMany(() => QualityInspectionEntity, (q) => q.inspector, {
    eager: false,
    cascade: true,
  })
  qualityInspections: QualityInspectionEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.operator, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
