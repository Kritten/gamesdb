import { Game } from './game.entity';
import { EntityService } from '../../utilities/entity.service';

export class GameService extends EntityService<Game> {
  constructor() {
    super(Game, {
      relations: [
        'categories',
        'moods',
        'universes',
        'mechanisms',
        'playableWith',
      ],
    });
  }
}
