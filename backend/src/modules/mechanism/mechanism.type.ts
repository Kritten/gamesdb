import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { GameType } from '../game/game.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MechanismType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameType])
  games: GameType[];
}
