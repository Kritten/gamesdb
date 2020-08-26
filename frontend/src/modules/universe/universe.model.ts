import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { UniverseInterface } from '@/modules/universe/universe.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Universe extends Entity implements UniverseInterface {
  name: string;

  constructor(data: UniverseInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }
}
