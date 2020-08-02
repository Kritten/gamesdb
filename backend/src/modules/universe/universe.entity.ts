import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Game } from '../game/game.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Universe {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Game,
    game => game.universes,
  )
  @Field(() => [Game], { defaultValue: [] })
  games: Game[];
}
