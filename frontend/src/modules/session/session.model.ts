import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { SessionInterface } from '@/modules/session/session.types';

export class Session extends Entity implements SessionInterface {
  constructor(data: SessionInterface = {}) {
    super(data);
  }
}
