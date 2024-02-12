import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyService } from '../service/company.service';
import { ApiFindOneCompany } from '../decorators/findOne-company.decorator';
import { ApiFindAllCompany } from '../decorators/findAll-company.decorator';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';

@Controller({
  version: '1',
  path: 'company',
})
@ApiTags('public.company')
export class CompanyPublicController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  @ApiFindAllCompany()
  public findAll(
    @Pagination() pagination: PaginationDto,
  ): Promise<CompanyEntity[]> {
    return this.companyService.findAll(pagination);
  }

  @Get(':id')
  @ApiFindOneCompany()
  public async findOneCompany(@Param('id') id: number): Promise<CompanyEntity> {
    return this.companyService.findOneCompany(id);
  }
}
