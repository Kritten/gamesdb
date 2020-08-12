import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Game } from '../game/game.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Image {
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
    type: 'text',
  })
  link: string;

  @ManyToMany(
    () => Game,
    game => game.images,
  )
  @Field(() => [Game], { defaultValue: [] })
  games: Game[];
}