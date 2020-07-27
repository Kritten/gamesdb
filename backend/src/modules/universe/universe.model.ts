import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { GameModel } from '../game/game.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PlayerModel } from '../player/player.model';

@ObjectType()
export class UniverseModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameModel])
  games: GameModel[];
}
