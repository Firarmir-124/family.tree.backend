import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { ProposalEntity } from '../entities/proposal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../helpers/decorators/pagination.decorator';
import { CommonService } from '../../common/service/common.service';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly proposalRepository: Repository<ProposalEntity>,
    private readonly commonService: CommonService,
  ) {}
  async create(info: CreateProposalDto, files: Express.Multer.File[]) {
    const createTest = await this.proposalRepository.save(info);

    if (files.length !== 0) {
      await this.commonService.uploadFiles(files, createTest.id);
    }

    return createTest;
  }

  async findAll(pagination: PaginationDto): Promise<ProposalEntity[]> {
    return this.proposalRepository.find({
      where: {},
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
      relations: ['photos'],
    });
  }
  async getTotal(): Promise<number> {
    return this.proposalRepository.count();
  }

  async read(id: number) {
    const oneProposal = await this.proposalRepository.findOne({
      where: { id },
    });

    if (!oneProposal) {
      throw new BadRequestException();
    }

    await this.proposalRepository.update({ id }, { unread: true });
    return this.proposalRepository.findOneByOrFail({ id });
  }
  async unread(id: number) {
    const oneProposal = await this.proposalRepository.findOne({
      where: { id },
    });

    if (!oneProposal) {
      throw new BadRequestException();
    }

    await this.proposalRepository.update({ id }, { unread: false });
    return this.proposalRepository.findOneByOrFail({ id });
  }

  async remove(id: number) {
    const proposalOne = await this.proposalRepository.findOne({
      where: { id },
      relations: ['photos'],
    });

    if (!proposalOne) {
      throw new BadRequestException();
    }

    const pathImages = proposalOne.photos.map((item) => item.path);

    await this.commonService.removeFile(pathImages);

    await this.proposalRepository.delete({ id });

    return id;
  }
}
