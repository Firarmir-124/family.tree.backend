import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  username?: string;

  @ApiProperty({ example: 'John', description: 'First name of the user', required: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user', required: true })
  lastName: string;

  @ApiProperty({ example: '+1234567890', description: 'Mobile number of the user' })
  mobileNumber?: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user', required: true })
  password: string;

  @ApiProperty({ example: true, description: 'Flag indicating if the user is active', required: true })
  isActive: boolean;

  @ApiProperty({ example: 'IT', description: 'Department of the user', required: true })
  department: string;

  @ApiProperty({ example: 'photo1.jpg', description: 'User photo' })
  photo?: string;
}
