import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { SessionInterface } from '@/modules/session/session.types';
import { Game } from '@/modules/game/game.model';
import { Player } from '@/modules/player/player.model';
import { Playtime } from '@/modules/playtime/playtime.model';
import { EntityInterface, ID } from '@/modules/app/utilities/entity/entity.types';
import { ServiceGame } from '@/modules/game/game.service';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { store } from '@/modules/app/app.store';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';

export class Session extends Entity implements SessionInterface {
  game: Game;
  players: Player[];
  winners: Player[];
  playtimes: Playtime[];

  constructor(data: SessionInterface) {
    super(data);
    this.game = data.game;
    this.players = setDefaultIfNullOrUndefined<Player[]>(data.players, []);
    this.winners = setDefaultIfNullOrUndefined<Player[]>(data.winners, []);
    this.playtimes = setDefaultIfNullOrUndefined<Playtime[]>(data.playtimes, []);
  }

  static async parseFromServer(data: EntityInterface): Promise<Session> {
    const entity = (await super.parseFromServer(data)) as Session;

    if (entity.players !== undefined) {
      entity.players = entity.players.map(
        // @ts-ignore
        player => store.state.modulePlayer.players[player.id as ID],
      );
    }

    if (entity.winners !== undefined) {
      entity.winners = entity.winners.map(
        // @ts-ignore
        winners => store.state.modulePlayer.players[winners.id as ID],
      );
    }

    if (entity.game !== undefined) {
      const idGame = entity.game.id;
      entity.game = await ServiceGame.loadGame(idGame as ID);
    }

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.game = this.game.id;
    data.players = this.players.map(player => player.id);
    data.winners = this.winners.map(winner => winner.id);
    data.playtimes = this.playtimes.map(playtime => {
      const result: PlaytimeInterface = {};
      if (playtime.id !== undefined) {
        result.id = playtime.id;
      }
      result.start = playtime.start;
      result.end = playtime.end;

      return result;
    });

    return data;
  }
}
