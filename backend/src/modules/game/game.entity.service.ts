import { Game } from './game.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class GameEntityService extends EntityService<Game> {
  constructor() {
    super(Game, {
      relations: [
        'categories',
        'moods',
        'universes',
        'mechanisms',
        'playableWith',
        'expansions',
        'isExpansionOf',
        'sessions',
        'ratings',
      ],
    });
  }
}
