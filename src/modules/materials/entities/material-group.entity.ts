import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaterialEntity } from './material.entity';

@Entity({
  name: 'material_groups',
})
export class MaterialGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => MaterialEntity, (material) => material.id)
  materials: MaterialEntity[];

  @Column({ default: 0 })
  order: number;

  public get setOrder(): number {
    return this.materials ? this.materials.length : this.order;
  }
}
