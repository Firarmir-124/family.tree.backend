import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyService } from '../service/company.service';
import { CompanyEntity } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { ApiCreateCompany } from '../decorators/create-company.decorator';
import { ApiFindOneCompany } from '../decorators/findOne-company.decorator';
import { ApiUpdateCompany } from '../decorators/update-company.decorator';
import { ApiDeleteCompany } from '../decorators/delete-company.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  version: '1',
  path: 'company',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.company')
@ApiBearerAuth('access-token')
export class CompanyAdminController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiCreateCompany()
  @Post('')
  public createCompany(
    @Body() createCompany: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companyService.createCompany(createCompany);
  }

  @Get(':id')
  @ApiFindOneCompany()
  public findOneCompany(@Param('id') id: number): Promise<CompanyEntity> {
    return this.companyService.findOneCompany(id);
  }

  @Patch(':id')
  @ApiUpdateCompany()
  public updateCompany(
    @Param('id') id: number,
    @Body() dto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companyService.updateCompany(dto, id);
  }

  @Delete(':id')
  @ApiDeleteCompany()
  public removeCompany(@Param('id') id: number): Promise<number> {
    return this.companyService.removeCompany(id);
  }
}
