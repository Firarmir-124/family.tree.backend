import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationEntity } from '../entities/information.entity';

export const ApiCreateInformation = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Create information',
      description: 'Create information route for admin',
    }),
    ApiResponse({
      type: InformationEntity,
    }),
  );
