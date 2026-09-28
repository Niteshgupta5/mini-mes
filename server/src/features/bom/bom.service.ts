import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BomEntity,
  BomItemsEntity,
  MaterialEntity,
  ProductEntity,
} from '../../entities';
import { CreateBomDto } from './domain';

@Injectable()
export class BomService {
  constructor(
    @InjectRepository(BomEntity)
    private readonly bomRepo: Repository<BomEntity>,
    @InjectRepository(BomItemsEntity)
    private readonly itemRepo: Repository<BomItemsEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepo: Repository<MaterialEntity>,
  ) {}

  async create(dto: CreateBomDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const bom = await this.bomRepo.save(
      this.bomRepo.create({
        version: dto.version,
        product,
        items: [],
      }),
    );

    const items = [];
    for (const item of dto.items) {
      const material = await this.materialRepo.findOneBy({
        id: item.materialId,
      });
      if (!material)
        throw new NotFoundException(`Material ${item.materialId} not found`);
      items.push(
        await this.itemRepo.save(
          this.itemRepo.create({ bom, material, quantity: item.quantity }),
        ),
      );
    }

    bom.items = items;
    return await this.bomRepo.findOne({
      where: { id: bom.id },
      relations: { product: true, items: { material: true } },
    });
  }

  async findAll() {
    return await this.bomRepo.find({
      relations: { product: true, items: { material: true } },
    });
  }

  async findById(id: string) {
    const row = await this.bomRepo.findOne({
      where: { id },
      relations: { product: true, items: { material: true } },
    });
    if (!row) throw new NotFoundException('BOM not found');
    return row;
  }
}
