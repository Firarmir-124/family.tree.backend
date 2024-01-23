import { Injectable } from '@nestjs/common';
import { InformationEntity } from '../entities/information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInformationReqDto } from '../dto/create-information-req.dto';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationEntity)
    private readonly informationRepository: Repository<InformationEntity>,
  ) {}

  async findAll(find: {}, options = {}) {
    return this.informationRepository.find();
  }

  async create(info: CreateInformationReqDto) {
    return this.informationRepository.save(info);
  }

  async update(info: InformationEntity) {
    return this.informationRepository.save(info);
  }

  async remove(id: string) {
    return this.informationRepository.delete(id);
  }

  async getTotal() {
    return this.informationRepository.count();
  }
}
