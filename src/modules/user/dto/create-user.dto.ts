import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  username?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Flag indicating if the user is active',
    required: true,
  })
  active: boolean;
}
