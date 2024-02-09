import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from '../entities/company.entity';

export const ApiCreateCompany = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Создать компанию',
      description: 'Роут для создание компании',
    }),
    ApiResponse({
      type: CompanyEntity,
    }),
    ApiBody({ type: CreateCompanyDto }),
  );
