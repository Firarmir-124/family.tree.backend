import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true,
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
    required: true,
  })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is a proposal',
    description: 'Description of the proposal',
    required: true,
  })
  readonly message: string;
}
