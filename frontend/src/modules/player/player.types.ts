import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export interface PlayerInterface extends EntityInterface {
    name?: string;
    lastSession?: Date;
}
