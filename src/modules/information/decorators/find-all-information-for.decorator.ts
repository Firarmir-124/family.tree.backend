import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationEntity } from '../entities/information.entity';

export const ApiFindAllInformations = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      description: 'Find all informations route for admin',
    }),
    ApiResponse({
      type: InformationEntity,
      isArray: true,
    }),
  );
