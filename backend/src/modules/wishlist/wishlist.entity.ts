import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'tinyint',
  })
  price: number;

  @Column({
    type: 'text',
  })
  link: string;
}
