import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageEntity } from '../entities/page.entity';

export const ApiUpdatePage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Update page route for admin',
    }),
    ApiResponse({
      type: PageEntity,
    }),
  );
