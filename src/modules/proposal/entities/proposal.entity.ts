// proposal entity for postgres
// Path: src/modules/proposal/entities/proposal.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FilesEntity } from '../../common/entities/file.entity';

@Entity({
  name: 'proposals',
})
export class ProposalEntity extends Base {
  @Column()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  geo: string;

  @ApiProperty({ type: () => [FilesEntity] })
  @OneToMany(() => FilesEntity, (file) => file.proposal)
  photos: FilesEntity[];

  @ApiProperty()
  @Column({ default: false })
  unread: boolean;
}
