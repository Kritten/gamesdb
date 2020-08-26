import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MechanismInterface } from '@/modules/mechanism/mechanism.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Mechanism extends Entity implements MechanismInterface {
  name: string;

  constructor(data: MechanismInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }
}
