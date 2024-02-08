import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '../../common/entities/base.entity';

@Entity({
  name: 'pages',
})
export class PageEntity extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  metaTitle: string;

  @ApiProperty()
  @Column()
  metaDescription: string;
}
