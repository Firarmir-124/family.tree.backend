import { ApiProperty } from '@nestjs/swagger';
import { FilesEntity } from '../../common/entities/photo.entity';

export class CreateProposalDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: 'This is a proposal',
    description: 'message of the proposal',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: 'This is a proposal',
    description: 'type of the proposal',
    required: true,
  })
  type: string;

  @ApiProperty()
  geo: string;

  @ApiProperty()
  photos: FilesEntity[];
}
