import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CompanyEntity } from '../entities/company.entity';

export const ApiFindAllCompany = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiQuery({ name: 'page', type: Number, required: false }),
    ApiQuery({ name: 'perPage', type: Number, required: false }),
    ApiQuery({ name: 'sort', type: String, required: false }),
    ApiQuery({ name: 'sortDir', type: String, required: false }),
    ApiOperation({
      summary: 'Получить все компании',
      description: 'Роут для получение всех компаний',
    }),
    ApiResponse({
      type: [CompanyEntity],
    }),
  );
