import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MachineEntity,
  ProductionOrderEntity,
  RoutingOperationEntity,
  WorkOrderEntity,
} from '../../entities';
import { CreateWorkOrderDto, WorkOrderStatus } from './domain';
import { ProductionOrderStatus } from '../production-orders';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrderEntity)
    private readonly repo: Repository<WorkOrderEntity>,
    @InjectRepository(ProductionOrderEntity)
    private readonly poRepo: Repository<ProductionOrderEntity>,
    @InjectRepository(RoutingOperationEntity)
    private readonly opRepo: Repository<RoutingOperationEntity>,
    @InjectRepository(MachineEntity)
    private readonly machineRepo: Repository<MachineEntity>,
  ) {}

  async create(dto: CreateWorkOrderDto) {
    const po = await this.poRepo.findOneBy({ id: dto.productionOrderId });
    if (!po) throw new NotFoundException('Production order not found');

    const operation = dto.operationId
      ? ((await this.opRepo.findOneBy({ id: dto.operationId })) ?? undefined)
      : undefined;
    const machine = dto.machineId
      ? ((await this.machineRepo.findOneBy({ id: dto.machineId })) ?? undefined)
      : undefined;
    const number = `WO-${Date.now()}`;

    return await this.repo.save(
      this.repo.create({
        workOrderNumber: number,
        plannedQuantity: dto.plannedQuantity,
        productionOrder: po,
        routingOperation: operation,
        machine,
        status: WorkOrderStatus.READY,
      }),
    );
  }

  async findAll() {
    return await this.repo.find({
      relations: {
        productionOrder: { product: true },
        routingOperation: { workCenter: true },
        machine: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    const row = await this.repo.findOne({
      where: { id },
      relations: {
        productionOrder: { product: true },
        routingOperation: { workCenter: true },
        machine: true,
      },
    });
    if (!row) throw new NotFoundException('Work order not found');
    return row;
  }

  async start(id: string) {
    const row = await this.findById(id);
    if (![WorkOrderStatus.READY, WorkOrderStatus.PAUSED].includes(row.status))
      throw new BadRequestException('Work order cannot be started');
    row.status = WorkOrderStatus.IN_PROGRESS;
    row.startedAt ||= new Date();
    if (row.productionOrder.status === ProductionOrderStatus.RELEASED)
      row.productionOrder.status = ProductionOrderStatus.IN_PROGRESS;
    return await this.repo.save(row);
  }

  async complete(id: string) {
    const row = await this.findById(id);
    row.status = WorkOrderStatus.COMPLETED;
    row.completedAt = new Date();
    return await this.repo.save(row);
  }
}
