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
import { ProductionOrderStatus } from '../features/production-orders/domain';
import { ProductEntity } from './product.entity';
import { WorkOrderEntity } from './work-orders.entity';
import { TraceabilityRecordEntity } from './traceability-records.entity';

const PK_NAME = 'PK__' + ETableNames.Production_Orders;

@Entity({ name: ETableNames.Production_Orders })
export class ProductionOrderEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column({ type: 'int' })
  plannedQuantity: number;

  @Column({ type: 'int', default: 0 })
  producedQuantity: number;

  @Column({ type: 'int', default: 0 })
  goodQuantity: number;

  @Column({ type: 'int', default: 0 })
  scrapQuantity: number;

  @Column({
    type: 'enum',
    enum: ProductionOrderStatus,
    default: ProductionOrderStatus.DRAFT,
  })
  status: ProductionOrderStatus;

  @Column({ type: 'timestamptz', nullable: true })
  plannedStart?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  plannedEnd?: Date;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => ProductEntity, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `FK__${ETableNames.Production_Orders}__${ETableNames.Products}`,
  })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WorkOrderEntity, (wo) => wo.productionOrder, {
    eager: false,
    cascade: true,
  })
  workOrders: WorkOrderEntity[];

  @OneToMany(() => TraceabilityRecordEntity, (t) => t.productionOrder, {
    eager: false,
    cascade: true,
  })
  traceRecords: TraceabilityRecordEntity[];
}
