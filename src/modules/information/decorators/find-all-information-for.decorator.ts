import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllInformationResponseDto } from '../dto/find-all-information-response.dto';

export const ApiFindAllInformations = (): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiOperation({
      summary: 'Find all informations',
      description: 'Find all informations route for admin',
    }),
    ApiResponse({
      type: FindAllInformationResponseDto,
    }),
  );
