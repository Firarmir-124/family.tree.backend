import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { UpdateProposalDto } from '../dto/update-proposal.dto';
import { ProposalEntity } from '../entities/proposal.entity';
import { HelperNumberService } from '../../../helpers/services/helper.number.service';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly proposalRepository: Repository<ProposalEntity>,
    private readonly helperNumber: HelperNumberService,
  ) {}
  async create(info: CreateProposalDto) {
    const proposal = await this.proposalRepository.save({
      ...info,
      created: new Date(),
      unread: true,
    });
    return proposal;
  }

  async findAll(find: {}): Promise<ProposalEntity[]> {
    return this.proposalRepository.find({ where: find });
  }
  async getTotal(find: {}): Promise<number> {
    return this.proposalRepository.count({ where: find });
  }

  async read(id: number) {
    return this.proposalRepository.update({ id }, { unread: false });
  }
  async unread(id: number) {
    return this.proposalRepository.update({ id }, { unread: true });
  }

  async remove(id: number) {
    return this.proposalRepository.delete({ id });
  }
}
