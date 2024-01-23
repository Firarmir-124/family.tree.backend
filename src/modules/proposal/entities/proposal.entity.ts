// proposal entity for postgres
// Path: src/modules/proposal/entities/proposal.entity.ts
// Compare this snippet from src/modules/estate/entities/estate.entity.ts:
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FilesEntity } from '../../common/entities/photo.entity';

@Entity({
  name: 'proposals',
})
export class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  geo: string;

  @OneToMany(() => FilesEntity, (photo) => photo.id)
  photos: FilesEntity[];

  @Column({ default: false })
  unread: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;
}
