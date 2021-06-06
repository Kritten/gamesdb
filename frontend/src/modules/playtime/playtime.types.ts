import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export interface PlaytimeInterface extends EntityInterface {
  start?: Date;
  end?: Date | null;
}
