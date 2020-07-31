import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Wishlist {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
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
  @Field(() => Int)
  price: number;

  @Column({
    type: 'text',
  })
  link: string;
}
