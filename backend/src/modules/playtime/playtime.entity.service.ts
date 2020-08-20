import { EntityService } from '../../utilities/entity/entity.service';
import { Playtime } from './playtime.entity';

export class PlaytimeEntityService extends EntityService<Playtime> {
  constructor() {
    super(Playtime, { relations: ['session'] });
  }
}
