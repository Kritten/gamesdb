import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { Game } from '../game/game.entity';
import {Field, GraphQLISODateTime, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Session {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLISODateTime)
  date: Date;

  @Column({
    type: 'int',
  })
  @Field(() => Int)
  duration: number;

  // @Column({
  //   type: 'tinyint',
  // })
  // @Field(() => Int)
  // rating: number;

  @ManyToMany(
    () => Player,
    player => player.sessionsPlayed,
  )
  @JoinTable()
  @Field(() => [Player],{defaultValue: []})
  players: Player[];

  @ManyToMany(
    () => Player,
    player => player.sessionsWon,
  )
  @JoinTable()
  @Field(() => [Player],{defaultValue: []})
  winners: Player[];

  @ManyToOne(
    () => Game,
    game => game.sessions,
  )
  @JoinTable()
  @Field(() => [Game],{defaultValue: []})
  game: Game;
}
