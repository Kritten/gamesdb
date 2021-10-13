import { Game } from '../game/game.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mechanism {
  @Field(() => ID)
  id: string;

  name: string;

  @Field(() => [Game], { defaultValue: [] })
  games: Game[];
}
