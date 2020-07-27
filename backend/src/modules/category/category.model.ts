import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GameModel } from '../game/game.model';

@ObjectType()
export class CategoryModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [GameModel])
  games: GameModel[];
}
