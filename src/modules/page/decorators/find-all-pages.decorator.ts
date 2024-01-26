import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllPagesResponseDto } from '../dtos/find-all-pages-response.dto';

export const ApiFindAllPages = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Find all Pages route for admin',
    }),
    ApiResponse({
      type: FindAllPagesResponseDto,
    }),
  );
