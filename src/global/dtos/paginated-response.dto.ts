import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty()
  public items: T[];

  @ApiProperty()
  public totalCount: number;
}
