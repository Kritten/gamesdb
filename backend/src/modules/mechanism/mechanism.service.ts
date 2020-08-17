import { Mechanism } from './mechanism.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class MechanismService extends EntityService<Mechanism> {
  constructor() {
    super(Mechanism, { relations: ['games'] });
  }
}
