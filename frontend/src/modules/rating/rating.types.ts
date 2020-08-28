import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';

export interface RatingInterface extends EntityInterface {
  rating: number;
  player: Player;
  game: Game;
}
