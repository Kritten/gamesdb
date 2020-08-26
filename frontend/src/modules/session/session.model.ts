import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { SessionInterface } from '@/modules/session/session.types';
import { Game } from '@/modules/game/game.model';
import { Player } from '@/modules/player/player.model';
import { Playtime } from '@/modules/playtime/playtime.model';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { store } from '@/modules/app/app.store';
import { ServiceGame } from '@/modules/game/game.service';

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

  static async parseFromServer(data: EntityInterface): Session {
    const entity: Session = super.parseFromServer(data);

    if (entity.players !== undefined) {
      entity.players = entity.players.map(player => store.state.modulePlayer.players[player.id]);
    }

    if (entity.winners !== undefined) {
      entity.winners = entity.winners.map(winners => store.state.modulePlayer.players[winners.id]);
    }

    if (entity.game !== undefined) {
      const idGame = entity.game.id;
      entity.game = store.state.moduleGame.games[idGame];
      if (entity.game === undefined) {
        await ServiceGame.loadGame(idGame);
        entity.game = store.state.moduleGame.games[idGame];
      }
    }

    return entity;
  }
}
