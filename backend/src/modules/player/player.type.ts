import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../session/session.entity';
import { SessionType } from '../session/session.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GameType } from '../game/game.type';

@ObjectType()
export class PlayerType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SessionType])
  sessionsPlayed: SessionType[];

  @Field(() => [SessionType])
  sessionsWon: SessionType[];
}
