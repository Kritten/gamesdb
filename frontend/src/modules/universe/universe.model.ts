import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { UniverseInterface } from '@/modules/universe/universe.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Universe extends Entity implements UniverseInterface {
  name: string;

  constructor(data: UniverseInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }

  static async parseFromServer(data: EntityInterface): Promise<Universe> {
    const entity = (await super.parseFromServer(data)) as Universe;

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;

    return data;
  }
}
