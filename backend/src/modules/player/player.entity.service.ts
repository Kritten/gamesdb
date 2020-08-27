import { Player } from './player.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class PlayerEntityService extends EntityService<Player> {
  constructor() {
    super(Player, { relations: ['sessionsPlayed', 'sessionsWon'] });
  }
}
