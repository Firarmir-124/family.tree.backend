import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInformationDto {
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
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is a image',
    description: 'Image of the information',
    required: true,
  })
  readonly image: string;
}
