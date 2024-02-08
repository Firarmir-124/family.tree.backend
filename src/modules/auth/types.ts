import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthType {
  @ApiProperty()
  token: string = 'GRET.';
}
