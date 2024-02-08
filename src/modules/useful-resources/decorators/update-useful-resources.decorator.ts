import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';

export const ApiUpdateUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Update useful-resources',
      description: 'Update useful-resources route for admin',
    }),
    ApiResponse({
      type: UsefulResourcesEntity,
    }),
  );
