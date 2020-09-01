import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Player } from '@/modules/player/player.model';
import { Game } from '@/modules/game/game.model';

export interface SessionInterface extends EntityInterface {
  game: Game;
  isChallenge: boolean;
  players?: Player[];
  winners?: Player[];
  playtimes?: Playtime[];
}
