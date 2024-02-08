import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationEntity } from '../entities/information.entity';

export const ApiFindOneInformation = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Find one information',
      description: 'Find one information route for admin',
    }),
    ApiResponse({
      type: InformationEntity,
    }),
  );
