import { Session } from './session.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class SessionService extends EntityService<Session> {
  constructor() {
    super(Session, { relations: ['game', 'players', 'winners', 'playtimes'] });
  }
}
