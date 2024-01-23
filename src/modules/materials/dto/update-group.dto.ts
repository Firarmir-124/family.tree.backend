import {ApiProperty} from "@nestjs/swagger";

export class UpdateGroupDto {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({})
  title: string;
  @ApiProperty({})
  materials: number[];
  @ApiProperty({})
  order: number;
}
