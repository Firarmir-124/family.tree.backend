import { ApiProperty } from '@nestjs/swagger';
import { UsefulResourcesEntity } from '../entities/useful-resources.entity';

export class FindAllUsefulResourceResponseDto {
  @ApiProperty({
    isArray: true,
    type: UsefulResourcesEntity,
  })
  items: UsefulResourcesEntity[];

  @ApiProperty()
  count: number;
}
