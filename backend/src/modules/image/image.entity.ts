import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Game } from '../game/game.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Wishlist } from '../wishlist/wishlist.entity';

@Entity()
@ObjectType()
export class Image {
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
    type: 'text',
  })
  link: string;

  @ManyToMany(
    () => Game,
    game => game.images,
  )
  @Field(() => [Game], { defaultValue: [] })
  games: Game[];

  @ManyToMany(
    () => Wishlist,
    wishlist => wishlist.images,
  )
  @Field(() => [Wishlist], { defaultValue: [] })
  wishlists: Wishlist[];
}
