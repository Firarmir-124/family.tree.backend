import { ApiProperty } from '@nestjs/swagger';

export class SlugParamDto {
  @ApiProperty()
  public slug: string;
}
