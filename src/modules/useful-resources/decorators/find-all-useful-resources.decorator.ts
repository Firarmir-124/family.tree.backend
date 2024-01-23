import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';

export const ApiFindAllUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      description: 'Find all useful-resources route',
    }),
    ApiResponse({
      type: UsefulResourcesEntity,
      isArray: true,
    }),
  );
