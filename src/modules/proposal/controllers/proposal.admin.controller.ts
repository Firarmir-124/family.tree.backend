import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProposalService } from '../services/proposal.service';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { ProposalEntity } from '../entities/proposal.entity';

@Controller({
  version: '1',
  path: 'proposal',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.proposal')
@ApiBearerAuth('access-token')
export class ProposalAdminController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  @ApiOperation({ summary: 'Create proposal' })
  @ApiResponse({
    type: ProposalEntity,
    status: HttpStatus.CREATED,
    description: 'положительный ответ',
  })
  create(@Body() createProposalDto: CreateProposalDto) {
    return this.proposalService.create(createProposalDto);
  }

  @Get()
  @ApiOperation({ summary: 'findAll proposal' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @ApiQuery({ name: 'sort', type: String, required: false })
  @ApiQuery({ name: 'sortDir', type: String, required: false })
  @ApiResponse({
    type: [ProposalEntity],
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  findAll(@Pagination() pagination: PaginationDto) {
    return this.proposalService.findAll(pagination);
  }

  @Get('total')
  @ApiOperation({ summary: 'find total proposal' })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  getTotal() {
    return this.proposalService.getTotal({});
  }

  @Patch('activate/:id')
  @ApiOperation({ summary: 'activate by id proposal' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    type: ProposalEntity,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  read(@Param('id') id: number) {
    return this.proposalService.read(id);
  }

  @Patch('inactivate/:id')
  @ApiOperation({ summary: 'inactivate by id proposal' })
  @ApiResponse({
    type: ProposalEntity,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  @ApiParam({ name: 'id', type: String })
  unread(@Param('id') id: number) {
    return this.proposalService.unread(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete by id proposal' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    type: Number,
    status: HttpStatus.OK,
    description: 'положительный ответ',
  })
  remove(@Param('id') id: number) {
    return this.proposalService.remove(id);
  }
}
