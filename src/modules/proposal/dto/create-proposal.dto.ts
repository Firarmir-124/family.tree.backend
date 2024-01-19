import { ApiProperty } from "@nestjs/swagger";

export class CreateProposalDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user', required: true})
  name: string;
  @ApiProperty({ example: '+1234567890', description: 'Phone number of the user', required: true})
  phone: string;
  @ApiProperty({ example: 'Description', description: 'Description of the user', required: true})
  description: string;
}
