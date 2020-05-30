import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { GameType } from '../game/game.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PlayerType } from '../player/player.type';

@ObjectType()
export class UniverseType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameType])
  games: GameType[];
}
