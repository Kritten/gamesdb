import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Game } from '../game/game.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { JoinTable, ManyToOne } from 'typeorm/index';
import { Player } from '../player/player.entity';

@Entity()
@Unique(['game', 'player'])
@ObjectType()
export class Rating {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'tinyint',
  })
  @Field(() => Int)
  rating?: number;

  @ManyToOne(
    () => Game,
    game => game.ratings,
  )
  @JoinTable()
  @Field(() => Game)
  game: Game;

  @ManyToOne(
    () => Player,
    player => player.ratings,
  )
  @Field(() => Player)
  player: Player;
}
