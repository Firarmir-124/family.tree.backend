import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteCompany = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Удалить одну компанию',
      description: 'Роут для удаление одной компании',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ type: Number }),
  );
