import { ApiProperty } from '@nestjs/swagger';

export class PaginatedRequestDto {
  @ApiProperty({
    required: false,
    minimum: 1,
  })
  public page?: number;

  @ApiProperty({
    required: false,
    minimum: 10,
    maximum: 100,
  })
  public limit?: number;
}
