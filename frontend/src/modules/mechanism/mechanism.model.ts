import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MechanismInterface } from '@/modules/mechanism/mechanism.types';

export class Mechanism extends Entity implements MechanismInterface {
  name?: string;

  constructor(data: MechanismInterface = {}) {
    super(data);
    this.name = data.name;
  }
}
