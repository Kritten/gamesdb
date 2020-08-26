import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export class User extends Entity {
  name: string;

  constructor(data: { id: number; name: string }) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }
}
