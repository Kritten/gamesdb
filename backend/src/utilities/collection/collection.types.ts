import { Game } from '../../modules/game/game.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CollectionData {
  @Field(() => [Game])
  items: Game[];

  @Field(() => Int)
  count: number;
}
