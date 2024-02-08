// proposal entity for postgres
// Path: src/modules/proposal/entities/proposal.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:
import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'messages',
})
export class MessageEntity extends Base {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column({ default: false })
  unread: boolean;
}
