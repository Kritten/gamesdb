import { Game } from '../game/game.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Player } from '../player/player.entity';

@ObjectType()
export class Rating {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Game)
  game: Game;

  @Field(() => Player)
  player: Player;
}
