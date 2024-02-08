import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProposalService } from '../services/proposal.service';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../services/message.service';
import { ProposalEntity } from '../entities/proposal.entity';
import { MessageEntity } from '../entities/message.entity';

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
  @ApiOperation({ summary: 'create proposal' })
  @ApiResponse({
    type: ProposalEntity,
    description: 'положительный ответ',
    status: HttpStatus.CREATED,
  })
  async create(@Body() info: CreateProposalDto) {
    // TODO: photo upload
    return await this.proposalService.create(info);
  }

  @Post('message')
  @ApiResponse({
    type: MessageEntity,
    description: 'положительный ответ',
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'create message' })
  async createMessage(@Body() info: CreateMessageDto) {
    return await this.messageService.create(info);
  }
}
