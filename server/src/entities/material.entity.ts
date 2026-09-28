import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus, ProductUnit } from '../features/product/domain';
import { ETableNames } from './e-table-names';
import { BomItemsEntity } from './bom.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Materials;

@Entity({ name: ETableNames.Materials })
export class MaterialEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: ProductUnit.PCS })
  unit?: ProductUnit;

  @Column({ type: 'decimal', default: 0 })
  stock: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BomItemsEntity, (b) => b.material, {
    eager: false,
    cascade: true,
  })
  bomItems: BomItemsEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.material, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
