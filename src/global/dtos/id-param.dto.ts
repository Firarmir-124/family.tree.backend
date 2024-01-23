import { ApiProperty } from '@nestjs/swagger';

export class IdParamDto {
  @ApiProperty()
  public id: number;
}
