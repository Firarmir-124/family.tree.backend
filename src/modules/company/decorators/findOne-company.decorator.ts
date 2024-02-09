import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompanyEntity } from '../entities/company.entity';

export const ApiFindOneCompany = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить одну компанию',
      description: 'Роут для получение одной компании',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: CompanyEntity }),
  );
