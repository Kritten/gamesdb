import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { SessionInterface } from '@/modules/session/session.types';
import { Game } from '@/modules/game/game.model';
import { Player } from '@/modules/player/player.model';
import { Playtime } from '@/modules/playtime/playtime.model';
import { EntityInterface, ID } from '@/modules/app/utilities/entity/entity.types';
import { ServiceGame } from '@/modules/game/game.service';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { PlaytimeInterface } from '@/modules/playtime/playtime.types';
import { isEqual } from 'date-fns';
import { usePlayers } from '@/modules/player/composables/usePlayers';

export class Session extends Entity implements SessionInterface {
  comment?: string | null;

  isChallenge: boolean;

  isVirtual: boolean;

  game?: Game;

  players: Player[];

  winners: Player[];

  playtimes: Playtime[];

  constructor(data: SessionInterface) {
    super(data);
    this.comment = setDefaultIfNullOrUndefined<string | null>(data.comment, null);
    this.isChallenge = setDefaultIfNullOrUndefined<boolean>(data.isChallenge, false);
    this.isVirtual = setDefaultIfNullOrUndefined<boolean>(data.isVirtual, false);
    this.game = data.game;
    this.players = setDefaultIfNullOrUndefined<Player[]>(data.players, []);
    this.winners = setDefaultIfNullOrUndefined<Player[]>(data.winners, []);
    this.playtimes = setDefaultIfNullOrUndefined<Playtime[]>(data.playtimes, []);
  }

  get currentPlaytime(): Playtime | undefined {
    return this.playtimes.find((playtime) => playtime.end === null);
  }

  stop() {
    const indexCurrentPlaytime = this.playtimes.findIndex((playtime) => playtime.end === null);

    if (indexCurrentPlaytime > -1) {
      const currentPlaytime = this.playtimes[indexCurrentPlaytime];
      this.playtimes.splice(indexCurrentPlaytime, 1);
      currentPlaytime.end = new Date();
      delete currentPlaytime.id;
      this.playtimes.push(currentPlaytime);
      return true;
    }

    return false;
  }

  static async parseFromServer(data: EntityInterface): Promise<Session> {
    const entity = (await super.parseFromServer(data)) as Session;

    const { playerById } = usePlayers();

    if (entity.players !== undefined) {
      entity.players = entity.players.map(
        (player) => playerById(player.id as ID),
      );
    }

    if (entity.winners !== undefined) {
      entity.winners = entity.winners.map(
        (winner) => playerById(winner.id as ID),
      );
    }

    if (entity.game !== undefined) {
      const idGame = entity.game.id;
      entity.game = await ServiceGame.getOrLoadGame(idGame as ID);
    }

    entity.playtimes = await Promise.all(
      entity.playtimes.map((playtime) => Playtime.parseFromServer(playtime)),
    );

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    if (this.game === undefined) {
      throw Error('Session has to have a game');
    }
    data.game = this.game.id;
    data.comment = this.comment;
    data.isChallenge = this.isChallenge;
    data.isVirtual = this.isVirtual;
    data.players = this.players.map((player) => player.id);
    data.winners = this.winners.map((winner) => winner.id);
    data.playtimes = this.playtimes.map((playtime) => {
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
