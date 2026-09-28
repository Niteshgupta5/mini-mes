import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ETableNames } from "./e-table-names";
import { ProductEntity } from "./product.entity";
import { WorkCenterEntity } from "./work-center.entity";
import { WorkOrderEntity } from "./work-orders.entity";

const PK_NAME = "PK__" + ETableNames.Routings;
const PK_NAME_1 = "PK__" + ETableNames.Routing_Opertaions;

@Entity({ name: ETableNames.Routings })
export class RoutingEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ type: 'int'})
  version: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "uuid" })
  productId: string;

  @ManyToOne(() => ProductEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "productId",
    referencedColumnName: "id",
    foreignKeyConstraintName: `FK__${ETableNames.Routings}__${ETableNames.Products}`,
  })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RoutingOperationEntity, (r) => r.routing, { eager: false, cascade: true })
  operations: RoutingOperationEntity[];
}

@Entity({ name: ETableNames.Routing_Opertaions })
export class RoutingOperationEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: PK_NAME_1 })
  id: string;

  @Column({ type: 'int' })
  sequence: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric', default: 0 })
  idealCycleSeconds: number;

  @Column({ type: "uuid" })
  routingId: string;

  @ManyToOne(() => RoutingEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "routingId",
    referencedColumnName: "id",
    foreignKeyConstraintName: `FK__${ETableNames.Routing_Opertaions}__${ETableNames.Routings}`,
  })
  routing: RoutingEntity;

  @Column({ type: "uuid" })
  workCenterId: string;

  @ManyToOne(() => WorkCenterEntity, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({
    name: "workCenterId",
    referencedColumnName: "id",
    foreignKeyConstraintName: `FK__${ETableNames.Routing_Opertaions}__${ETableNames.Work_Centers}`,
  })
  workCenter: WorkCenterEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WorkOrderEntity, (wo) => wo.routingOperation, { eager: false, cascade: true })
  workOrders: WorkOrderEntity[];
}