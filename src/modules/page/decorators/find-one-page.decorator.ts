import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageEntity } from '../entities/page.entity';

export const ApiFindOnePage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'findOne page',
      description: 'Find one page route for admin',
    }),
    ApiResponse({
      type: PageEntity,
    }),
  );
