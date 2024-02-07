import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'material_groups',
})
export class MaterialGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 10000 })
  materials: string;

  @Column()
  order: number;
}
