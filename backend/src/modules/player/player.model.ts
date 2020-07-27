import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../session/session.entity';
import { SessionModel } from '../session/session.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GameModel } from '../game/game.model';

@ObjectType()
export class PlayerModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SessionModel])
  sessionsPlayed: SessionModel[];

  @Field(() => [SessionModel])
  sessionsWon: SessionModel[];
}
