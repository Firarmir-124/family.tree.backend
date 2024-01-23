import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageRequestDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public metaTitle: string;

  @ApiProperty()
  public metaDescription: string;
}
