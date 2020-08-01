import { Player } from './player.entity';
import { EntityService } from '../../utilities/entity.service';

export class PlayerService extends EntityService<Player> {
  constructor() {
    super(Player, { relations: ['sessionsPlayed', 'sessionsWon'] });
  }
}
