import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';
import { Repository } from 'typeorm';
import { CreateUsefuleResourcesReqDto } from '../dtos/create-useful-resources-req.dto';
import { UpdateUsefuleResourcesReqDto } from '../dtos/update-useful-resources-req.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { FindAllUsefulResourceResponseDto } from '../dtos/find-all-useful-resources-response.dto';

@Injectable()
export class UsefulResourcesService {
  @InjectRepository(UsefulResourcesEntity)
  private readonly usefulResourcesRepository: Repository<UsefulResourcesEntity>;

  public async create(
    req: CreateUsefuleResourcesReqDto,
  ): Promise<UsefulResourcesEntity> {
    const instance = this.usefulResourcesRepository.create(req);
    const usefulResource = await this.usefulResourcesRepository.save(instance);

    return usefulResource;
  }

  public async update(
    usefulResouceId: number,
    req: UpdateUsefuleResourcesReqDto,
  ): Promise<UsefulResourcesEntity> {
    const existedUsefulResource = await this.usefulResourcesRepository.findOne({
      where: {
        id: usefulResouceId,
      },
    });

    if (!existedUsefulResource) {
      throw new NotFoundException(
        `UsefulResource by id ${usefulResouceId} not found`,
      );
    }

    await this.usefulResourcesRepository.update(
      { id: existedUsefulResource.id },
      {
        ...req,
      },
    );

    return this.usefulResourcesRepository.findOneOrFail({
      where: {
        id: existedUsefulResource.id,
      },
    });
  }

  public async findOneOrFail(
    usefulResourceId: number,
  ): Promise<UsefulResourcesEntity> {
    const usefulResource = await this.usefulResourcesRepository.findOne({
      where: {
        id: usefulResourceId,
      },
    });

    if (!usefulResource) {
      throw new NotFoundException(
        `UsefulResource by id ${usefulResourceId} not found`,
      );
    }

    return usefulResource;
  }

  public async delete(usefulResourceId: number): Promise<void> {
    const existedUsefulResource = await this.usefulResourcesRepository.findOne({
      where: {
        id: usefulResourceId,
      },
    });

    if (!existedUsefulResource) {
      throw new NotFoundException(
        `UsefulResource by id ${usefulResourceId} not found`,
      );
    }

    await this.usefulResourcesRepository.remove(existedUsefulResource);
  }

  public async findAll(
    pagination: PaginationDto,
  ): Promise<FindAllUsefulResourceResponseDto> {
    const [items, count] = await this.usefulResourcesRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
    });

    return {
      items,
      count,
    };
  }
}
