import { PlayerType } from '../player/player.type';
import { GameType } from '../game/game.type';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionType {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  rating: number;

  @Field(() => [PlayerType])
  players: PlayerType[];

  @Field(() => [PlayerType])
  winners: PlayerType[];

  @Field(() => GameType)
  game: GameType;
}
