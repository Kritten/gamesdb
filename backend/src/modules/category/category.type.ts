import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GameType } from '../game/game.type';

@ObjectType()
export class CategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameType])
  games: GameType[];
}
