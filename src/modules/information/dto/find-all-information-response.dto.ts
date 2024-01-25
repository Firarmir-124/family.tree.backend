import { ApiProperty } from '@nestjs/swagger';
import { InformationEntity } from '../entities/information.entity';

export class FindAllInformationResponseDto {
  @ApiProperty({
    type: InformationEntity,
    isArray: true,
  })
  items: InformationEntity[];

  @ApiProperty()
  count: number;
}
