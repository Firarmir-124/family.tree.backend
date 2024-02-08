import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { ProposalEntity } from '../entities/proposal.entity';
import { HelperNumberService } from '../../../helpers/services/helper.number.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly proposalRepository: Repository<ProposalEntity>,
    private readonly helperNumber: HelperNumberService,
  ) {}
  async create(info: CreateProposalDto) {
    return await this.proposalRepository.save({
      ...info,
      created: new Date(),
      unread: true,
      photos: [],
    });
  }

  async findAll(pagination: PaginationDto): Promise<ProposalEntity[]> {
    return this.proposalRepository.find({
      where: {},
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
    });
  }
  async getTotal(find: {}): Promise<number> {
    return this.proposalRepository.count({ where: find });
  }

  async read(id: number) {
    await this.proposalRepository.update({ id }, { unread: false });
    return this.proposalRepository.findOneByOrFail({ id });
  }
  async unread(id: number) {
    await this.proposalRepository.update({ id }, { unread: true });
    return this.proposalRepository.findOneByOrFail({ id });
  }

  async remove(id: number) {
    await this.proposalRepository.delete({ id });
    return id;
  }
}
