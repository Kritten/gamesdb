import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Image } from '../image/image.entity';

@Entity()
@ObjectType()
export class Wishlist {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
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
    type: 'boolean',
    default: false,
  })
  taken?: boolean;

  @Column({
    type: 'text',
  })
  link: string;

  @ManyToMany(
    () => Image,
    image => image.wishlists,
  )
  @JoinTable()
  @Field(() => [Image], { defaultValue: [] })
  images: Image[];
}
