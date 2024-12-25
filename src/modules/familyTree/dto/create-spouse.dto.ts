import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpouseDto {
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
}
