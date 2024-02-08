import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';

export const ApiFindOneUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      summary: 'Find one useful-resources',
      description: 'Find one useful-resources route',
    }),
    ApiResponse({
      type: UsefulResourcesEntity,
    }),
  );
