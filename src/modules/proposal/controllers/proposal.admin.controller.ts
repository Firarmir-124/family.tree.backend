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
import { UpdateProposalDto } from '../dto/update-proposal.dto';
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
    return this.proposalService.findAll(
      {},
      {
        limit: pagination.perPage,
        skip: (pagination.page - 1) * pagination.perPage,
      },
    );
  }

  @Get('total')
  getTotal() {
    return this.proposalService.getTotal({});
  }

  @Patch('activate/:id')
  @ApiParam({ name: 'id', type: String })
  activate(@Param('id') id: string) {
    return this.proposalService.activate(id);
  }

  @Patch('inactivate/:id')
  @ApiParam({ name: 'id', type: String })
  deactivate(@Param('id') id: string) {
    return this.proposalService.deactivate(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.proposalService.remove(id);
  }
}
