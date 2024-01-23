import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { UpdateProposalDto } from '../dto/update-proposal.dto';
import { ProposalEntity } from '../entities/proposal.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HelperNumberService } from '../../../helpers/services/helper.number.service';
import axios from 'axios';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(ProposalEntity.name)
    private readonly proposalModel: Model<ProposalEntity>,
    private readonly helperNumber: HelperNumberService,
  ) {}
  async create(info: CreateProposalDto) {
    const proposal = await this.proposalModel.create({
      ...info,
      createdAt: new Date(),
      id: this.helperNumber.randomInRange(100000, 999999),
    });
    // TODO: bitrix send proposal
    const fields = {
      FIELDS: {
        TITLE: 'Новый лид с сайта',
        NAME: info.name,
        LAST_NAME: info.description,
        EMAIL: [
          {
            VALUE: '',
            VALUE_TYPE: 'WORK',
          },
        ],
        PHONE: [
          {
            VALUE: info.phone,
            VALUE_TYPE: 'WORK',
          },
        ],
      },
    };
    //https://b24-n5908757a5bb3c.bitrix24.ru/rest/25982/ef1kkum5jl89jgq2/crm.lead.add.json?FIELDS[TITLE]=Новый лид&FIELDS[NAME]=Иван&FIELDS[LAST_NAME]=Петров&FIELDS[EMAIL][0][VALUE]=mail@example.com&FIELDS[EMAIL][0][VALUE_TYPE]=WORK&FIELDS[PHONE][0][VALUE]=555888&FIELDS[PHONE][0][VALUE_TYPE]=WORK
    await axios.post(
      'https://b24-n5908757a5bb3c.bitrix24.ru/rest/25982/ef1kkum5jl89jgq2/crm.lead.add.json',
      fields,
    );
    return proposal;
  }

  async findAll(find: {}, options = {}): Promise<ProposalEntity[]> {
    return this.proposalModel.find(find, null, options);
  }
  async getTotal(find: {}): Promise<number> {
    return this.proposalModel.count(find);
  }

  async activate(id: string) {
    return this.proposalModel.updateOne({ id }, { active: true });
  }
  async deactivate(id: string) {
    return this.proposalModel.updateOne({ id }, { active: false });
  }

  async remove(id: string) {
    return this.proposalModel.deleteOne({ id });
  }
}
