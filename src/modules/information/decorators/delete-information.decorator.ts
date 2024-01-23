import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDeleteInformation = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Delete information by id route for admin',
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
