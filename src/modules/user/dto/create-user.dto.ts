import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'address', description: 'address' })
  readonly address?: string;

  @ApiProperty()
  @IsOptional()
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

  @IsOptional()
  @ApiProperty({
    example: 'password',
    description: 'password',
    required: false,
  })
  public password: string;

  @IsOptional()
  @ApiProperty({
    example: 'newPassword',
    description: 'newPassword',
    required: false,
  })
  public newPassword: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly photo: string;
}
