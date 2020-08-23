import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { SessionInterface } from '@/modules/session/session.types';
import { Game } from '@/modules/game/game.model';
import { Player } from '@/modules/player/player.model';
import { Playtime } from '@/modules/playtime/playtime.model';

export class Session extends Entity implements SessionInterface {
  game?: Game;
  players?: Player[];
  winners?: Player[];
  playtimes?: Playtime[];

  constructor(data: SessionInterface = {}) {
    super(data);
    this.game = data.game;
    this.players = data.players === undefined ? [] : data.players;
    this.winners = data.winners === undefined ? [] : data.winners;
    this.playtimes = data.playtimes === undefined ? [] : data.playtimes;
  }
}
