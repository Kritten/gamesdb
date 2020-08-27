import { Universe } from './universe.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class UniverseEntityService extends EntityService<Universe> {
  constructor() {
    super(Universe, { relations: ['games'] });
  }
}
