import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInformationReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'This is a title',
    description: 'Title of the information',
    required: false,
  })
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'This is a description',
    description: 'Description of the information',
    required: false,
  })
  readonly content: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Токтогулский район',
    description: 'Disctrict name',
    required: false,
  })
  readonly district: string;
}
