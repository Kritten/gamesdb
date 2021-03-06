import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { Game } from '../game/game.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Playtime } from '../playtime/playtime.entity';

@Entity()
@ObjectType()
export class Session {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isChallenge: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isVirtual: boolean;

  @ManyToMany(
    () => Player,
    player => player.sessionsPlayed,
  )
  @JoinTable()
  @Field(() => [Player], { defaultValue: [] })
  players: Player[];

  @ManyToMany(
    () => Player,
    player => player.sessionsWon,
  )
  @JoinTable()
  @Field(() => [Player], { defaultValue: [] })
  winners: Player[];

  @ManyToOne(
    () => Game,
    game => game.sessions,
    { onDelete: 'CASCADE' },
  )
  @Field(() => Game, { nullable: true })
  game: Game;

  @OneToMany(
    () => Playtime,
    playtime => playtime.session,
  )
  @JoinTable()
  @Field(() => [Playtime], { defaultValue: [] })
  playtimes: Playtime[];
}
