import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'pages',
})
export class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column()
  metaTitle: string;

  @Column()
  metaDescription: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
