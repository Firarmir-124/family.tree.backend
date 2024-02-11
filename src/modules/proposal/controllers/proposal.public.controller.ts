import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProposalService } from '../services/proposal.service';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageService } from '../services/message.service';
import { ProposalEntity } from '../entities/proposal.entity';
import { MessageEntity } from '../entities/message.entity';
import { FastifyFilesInterceptor } from '../../common/decorators/fastifys.decorator';

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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'create proposal' })
  @ApiResponse({
    type: ProposalEntity,
    description: 'положительный ответ',
    status: HttpStatus.CREATED,
  })
  @UseInterceptors(FastifyFilesInterceptor('photo', 10, './uploads'))
  async create(
    @Body() info: CreateProposalDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // TODO: photo upload
    return await this.proposalService.create(info, files);
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
