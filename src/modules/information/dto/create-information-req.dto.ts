import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInformationReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is a title',
    description: 'Title of the information',
    required: true,
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is a description',
    description: 'Description of the information',
    required: true,
  })
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Токтогулский район',
    description: 'Disctrict name',
    required: true,
  })
  readonly district: string;
}
