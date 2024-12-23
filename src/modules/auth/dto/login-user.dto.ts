import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'login' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'login' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly token?: string;
}
