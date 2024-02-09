import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompanyEntity } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';

export const ApiUpdateCompany = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Редактировать одну компанию',
      description: 'Роут для редактирование одной компании',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: CompanyEntity }),
    ApiBody({ type: CreateCompanyDto }),
  );
