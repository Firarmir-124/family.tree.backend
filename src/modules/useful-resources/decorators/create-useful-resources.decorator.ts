import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';

export const ApiCreateUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Create useful-resources',
      description: 'Create useful-resources route for admin',
    }),
    ApiResponse({
      type: UsefulResourcesEntity,
    }),
  );
