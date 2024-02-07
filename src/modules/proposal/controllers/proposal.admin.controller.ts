import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProposalService } from '../services/proposal.service';
import { CreateProposalDto } from '../dto/create-proposal.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';

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
  @ApiBody({ type: CreateProposalDto })
  create(@Body() createProposalDto: CreateProposalDto) {
    return this.proposalService.create(createProposalDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @ApiQuery({ name: 'sort', type: String, required: false })
  @ApiQuery({ name: 'sortDir', type: String, required: false })
  findAll(@Pagination() pagination: PaginationDto) {
    return this.proposalService.findAll({});
  }

  @Get('total')
  getTotal() {
    return this.proposalService.getTotal({});
  }

  @Patch('activate/:id')
  @ApiParam({ name: 'id', type: String })
  read(@Param('id') id: number) {
    return this.proposalService.read(id);
  }

  @Patch('inactivate/:id')
  @ApiParam({ name: 'id', type: String })
  unread(@Param('id') id: number) {
    return this.proposalService.unread(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: number) {
    return this.proposalService.remove(id);
  }
}
