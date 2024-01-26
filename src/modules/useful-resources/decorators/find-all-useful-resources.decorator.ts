import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllUsefulResourceResponseDto } from '../dtos/find-all-useful-resources-response.dto';

export const ApiFindAllUsefulResources = (): ReturnType<
  typeof applyDecorators
> =>
  applyDecorators(
    ApiOperation({
      description: 'Find all useful-resources route',
    }),
    ApiResponse({
      type: FindAllUsefulResourceResponseDto,
    }),
  );
