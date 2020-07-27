import { PlayerModel } from '../player/player.model';
import { GameModel } from '../game/game.model';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionModel {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  rating: number;

  @Field(() => [PlayerModel])
  players: PlayerModel[];

  @Field(() => [PlayerModel])
  winners: PlayerModel[];

  @Field(() => GameModel)
  game: GameModel;
}
