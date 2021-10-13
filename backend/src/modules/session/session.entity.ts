import { Player } from '../player/player.entity';
import { Game } from '../game/game.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Playtime } from '../playtime/playtime.entity';

@ObjectType()
export class Session {
  @Field(() => ID)
  id: string;

  comment?: string;

  isChallenge: boolean;

  isVirtual: boolean;

  @Field(() => [Player], { defaultValue: [] })
  players: Player[];

  @Field(() => [Player], { defaultValue: [] })
  winners: Player[];

  @Field(() => Game, { nullable: true })
  game: Game;

  @Field(() => [Playtime], { defaultValue: [] })
  playtimes: Playtime[];
}
