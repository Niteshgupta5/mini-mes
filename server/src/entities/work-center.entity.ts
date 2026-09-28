import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ETableNames } from './e-table-names';
import { MachineEntity } from './machine.entity';
import { RoutingOperationEntity } from './routing.entity';

const PK_NAME = "PK__" + ETableNames.Work_Centers;

@Entity({ name: ETableNames.Work_Centers })
export class WorkCenterEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: PK_NAME })
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MachineEntity, (m) => m.workCenter, { eager: false, cascade: true })
  machines: MachineEntity[];

  @OneToMany(() => RoutingOperationEntity, (ro) => ro.workCenter, { eager: false, cascade: true })
  routingOperations: RoutingOperationEntity[];
}