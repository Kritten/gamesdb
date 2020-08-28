import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { RatingInterface } from '@/modules/rating/rating.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { EntityInterface } from '../app/utilities/entity/entity.types';
import { store } from '../app/app.store';

export class Rating extends Entity implements RatingInterface {
  rating: number;
  player: Player;
  game: Game;

  constructor(data: RatingInterface = {}) {
    super(data);
    this.rating = setDefaultIfNullOrUndefined<number>(data.rating, undefined);
    this.player = setDefaultIfNullOrUndefined<Player>(data.player, undefined);
    this.game = setDefaultIfNullOrUndefined<Game>(data.game, undefined);
  }

  static async parseFromServer(data: EntityInterface): Promise<Rating> {
    const entity = (await super.parseFromServer(data)) as Rating;

    if (entity.player !== undefined) {
      entity.player = store.state.modulePlayer.players[entity.id];
    }

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.rating = this.rating;
    data.player = this.player.id;
    data.game = this.game.id;

    return data;
  }
}
