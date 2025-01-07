import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGalleryDto {
  @ApiProperty({ example: 'descendant', description: 'descendant' })
  @IsOptional()
  @IsString()
  readonly descendant: Types.ObjectId;

  @ApiProperty({ example: 'images', description: 'images' })
  @IsOptional()
  @IsArray()
  readonly images: Types.ObjectId[];
}
