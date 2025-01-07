import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateGeneralDataDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsOptional()
  @IsString()
  readonly title: string;
  @ApiProperty({ example: 'description', description: 'description' })
  @IsOptional()
  @IsString()
  readonly description: string;
}
