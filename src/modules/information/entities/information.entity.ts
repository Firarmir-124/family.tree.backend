// information entity for postgres
// Path: src/modules/information/entities/information.entity.ts
// Compare this snippet from src/modules/dictionary/dictionary.module.ts:

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity({
  name: 'information',
})
export class InformationEntity extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  district: string;
}
