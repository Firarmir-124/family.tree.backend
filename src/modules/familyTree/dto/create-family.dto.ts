import { ApiProperty } from '@nestjs/swagger';
import {
  isArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFamilyDto {
  @ApiProperty({ example: 'name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly photo?: string;

  @ApiProperty({ example: 'dob', description: 'dob' })
  @IsNotEmpty()
  @IsString()
  readonly dob: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'dod', description: 'dod' })
  public dod: string;

  @ApiProperty({ example: 'description', description: 'description' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'genus', description: 'genus' })
  @IsOptional()
  @IsString()
  readonly genus: string;

  @ApiProperty({ example: 'type', description: 'type' })
  @IsOptional()
  @IsString()
  readonly type: string;

  @ApiProperty({ example: 'spouse', description: 'spouse' })
  @IsOptional()
  @IsObject()
  readonly spouse: object;

  @ApiProperty({ example: 'spouse', description: 'spouse' })
  @IsOptional()
  @IsString()
  readonly parent: string;
}
