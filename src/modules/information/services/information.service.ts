import { Injectable, NotFoundException } from '@nestjs/common';
import { InformationEntity } from '../entities/information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInformationReqDto } from '../dto/create-information-req.dto';
import { UpdateInformationReqDto } from '../dto/update-information-req.dto';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { FindAllInformationResponseDto } from '../dto/find-all-information-response.dto';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationEntity)
    private readonly informationRepository: Repository<InformationEntity>,
  ) {}

  async findAll(
    pagination: PaginationDto,
  ): Promise<FindAllInformationResponseDto> {
    const [items, count] = await this.informationRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
    });

    return {
      items,
      count,
    };
  }

  async create(info: CreateInformationReqDto) {
    const instance = this.informationRepository.create(info);
    const information = await this.informationRepository.save(instance);

    return information;
  }

  async update(informationId: number, req: UpdateInformationReqDto) {
    const existedInformation = await this.informationRepository.findOne({
      where: {
        id: informationId,
      },
    });

    if (!existedInformation) {
      throw new NotFoundException(
        `Information by id ${informationId} not found`,
      );
    }

    await this.informationRepository.update(
      { id: existedInformation.id },
      {
        ...req,
      },
    );

    return this.informationRepository.findOneByOrFail({
      id: existedInformation.id,
    });
  }

  async remove(informationId: number) {
    const existedInformation = await this.informationRepository.findOne({
      where: {
        id: informationId,
      },
    });

    if (!existedInformation) {
      throw new NotFoundException(
        `Information by id ${informationId} not found`,
      );
    }

    await this.informationRepository.remove(existedInformation);
  }

  async findOneOrFail(informationId: number): Promise<InformationEntity> {
    const information = await this.informationRepository.findOne({
      where: {
        id: informationId,
      },
    });

    if (!information) {
      throw new NotFoundException(
        `Information by id ${informationId} not found`,
      );
    }

    return information;
  }

  async getTotal() {
    return this.informationRepository.count();
  }
}
