import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProposalService } from '../services/proposal.service';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../services/message.service';

@Controller({
  version: '1',
  path: 'support',
})
@ApiTags('public.proposal')
export class ProposalPublicController {
  constructor(
    private readonly proposalService: ProposalService,
    private readonly messageService: MessageService,
  ) {}

  @Post('proposal')
  async create(@Body() info: CreateProposalDto) {
    // TODO: photo upload
    return await this.proposalService.create(info);
  }

  @Post('message')
  async createMessage(@Body() info: CreateMessageDto) {
    return await this.messageService.create(info);
  }
}
