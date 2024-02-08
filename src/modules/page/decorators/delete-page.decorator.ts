import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDeletePage = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'delete page',
      description: 'Delete page by id route for admin',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
