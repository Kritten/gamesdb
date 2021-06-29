import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

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
    type: 'int',
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
  description: string;

  @Column({
    type: 'text',
  })
  link: string;

  @Column({
    type: 'tinyint',
  })
  giftFor: number;

  @Column({
    type: 'text',
    default: '[]'
  })
  images: string;
}
