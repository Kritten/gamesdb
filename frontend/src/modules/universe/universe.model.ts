import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { UniverseInterface } from '@/modules/universe/universe.types';

export class Universe extends Entity implements UniverseInterface {
  name?: string;

  constructor(data: UniverseInterface = {}) {
    super(data);
    this.name = data.name;
  }
}
