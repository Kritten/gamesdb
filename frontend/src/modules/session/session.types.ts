import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Player } from '@/modules/player/player.model';
import { Game } from '@/modules/game/game.model';
import { ServiceCollectionStatic } from '@/modules/app/utilities/collection/collection.types';

export interface SessionInterface extends EntityInterface {
  game?: Game;
  players?: Player[];
  winners?: Player[];
  playtimes?: Playtime[];
}

export interface ServiceSessionStatic extends ServiceCollectionStatic {}
