import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageEntity } from '../entities/page.entity';

export const ApiCreatePage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Create page route for admin',
    }),
    ApiResponse({
      type: PageEntity,
    }),
  );
