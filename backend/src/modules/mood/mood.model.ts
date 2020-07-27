import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { GameModel } from '../game/game.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MoodModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameModel])
  games: GameModel[];
}
