import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'email' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'address' })
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'phone' })
  @IsOptional()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: 'city' })
  @IsOptional()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsOptional()
  readonly token?: string;
}
