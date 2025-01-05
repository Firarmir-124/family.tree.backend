import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'address', description: 'address' })
  readonly address?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly city?: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
    description: 'admin',
    required: true,
  })
  public password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;
}
