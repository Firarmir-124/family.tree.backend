import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageEntity } from '../entities/page.entity';

export const ApiFindOneBySlugPage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Find one page by slug route for admin',
    }),
    ApiResponse({
      type: PageEntity,
    }),
  );
