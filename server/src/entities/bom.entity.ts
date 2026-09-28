import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ETableNames } from "./e-table-names";
import { ProductEntity } from "./product.entity";
import { MaterialEntity } from "./material.entity";

const PK_NAME = "PK__" + ETableNames.Bom;
const PK_NAME_1 = "PK__" + ETableNames.Bom_Items;

@Entity({ name: ETableNames.Bom })
export class BomEntity {
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
    foreignKeyConstraintName: `FK__${ETableNames.Bom}__${ETableNames.Products}`,
  })
  product: ProductEntity;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BomItemsEntity, (b) => b.bom, { eager: false, cascade: true })
  items: BomItemsEntity[];
}

@Entity({ name: ETableNames.Bom_Items })
export class BomItemsEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: PK_NAME_1 })
  id: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: "uuid" })
  bomId: string;

  @ManyToOne(() => BomEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "bomId",
    referencedColumnName: "id",
    foreignKeyConstraintName: `FK__${ETableNames.Bom_Items}__${ETableNames.Bom}`,
  })
  bom: BomEntity;

  @Column({ type: "uuid" })
  materialId: string;

  @ManyToOne(() => MaterialEntity, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({
    name: "materialId",
    referencedColumnName: "id",
    foreignKeyConstraintName: `FK__${ETableNames.Bom_Items}__${ETableNames.Materials}`,
  })
  material: MaterialEntity;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}