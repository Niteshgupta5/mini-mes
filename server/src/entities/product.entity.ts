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
import { BomEntity } from './bom.entity';
import { RoutingEntity } from './routing.entity';
import { ProductionOrderEntity } from './production-orders.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Products;

@Entity({ name: ETableNames.Products })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'varchar', default: ProductUnit.PCS })
  unit?: ProductUnit;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BomEntity, (b) => b.product, { eager: false, cascade: true })
  boms: BomEntity[];

  @OneToMany(() => RoutingEntity, (r) => r.product, {
    eager: false,
    cascade: true,
  })
  routings: RoutingEntity[];

  @OneToMany(() => ProductionOrderEntity, (p) => p.product, {
    eager: false,
    cascade: true,
  })
  productionOrders: ProductionOrderEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.product, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
