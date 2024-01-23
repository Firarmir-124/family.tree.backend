import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationEntity } from '../entities/information.entity';

export const ApiUpdateInformation = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Update information route for admin',
    }),
    ApiResponse({
      type: InformationEntity,
    }),
  );
