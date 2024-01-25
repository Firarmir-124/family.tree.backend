import { ApiProperty } from '@nestjs/swagger';
import { PageEntity } from '../entities/page.entity';

export class FindAllPagesResponseDto {
  @ApiProperty({
    type: PageEntity,
    isArray: true,
  })
  items: PageEntity[];

  @ApiProperty()
  count: number;
}
