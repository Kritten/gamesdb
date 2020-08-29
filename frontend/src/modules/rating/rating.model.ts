import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { RatingInterface } from '@/modules/rating/rating.types';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { EntityInterface, ID } from '../app/utilities/entity/entity.types';
import { store } from '@/modules/app/app.store';

export class Rating extends Entity implements RatingInterface {
  rating?: number;
  player?: Player;
  game?: Game;

  constructor(data: RatingInterface = {}) {
    super(data);
    this.rating = data.rating;
    this.player = data.player;
    this.game = data.game;
  }

  static async parseFromServer(data: EntityInterface): Promise<Rating> {
    const entity = (await super.parseFromServer(data)) as Rating;

    if (entity.player !== undefined) {
      // @ts-ignore
      entity.player = store.state.modulePlayer.players[entity.id as ID];
    }

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.rating = this.rating;
    data.player = (this.player as Player).id;
    data.game = (this.game as Game).id;

    return data;
  }
}
