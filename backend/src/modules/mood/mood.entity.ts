import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Game } from '../game/game.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Mood {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Game,
    game => game.moods,
  )
  @Field(() => [Game], { defaultValue: [] })
  games: Game[];
}
