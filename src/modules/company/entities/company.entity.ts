import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'company',
})
export class CompanyEntity extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  link: string;
}
