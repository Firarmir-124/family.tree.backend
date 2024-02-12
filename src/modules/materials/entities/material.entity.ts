import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaterialGroupEntity } from './material-group.entity';

@Entity({
  name: 'materials',
})
export class MaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => MaterialGroupEntity, (group) => group.materials)
  groupMaterial: MaterialGroupEntity;
}
