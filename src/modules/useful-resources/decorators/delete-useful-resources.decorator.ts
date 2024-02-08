import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete useful-resources',
      description: 'Delete useful-resources route for admin',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
