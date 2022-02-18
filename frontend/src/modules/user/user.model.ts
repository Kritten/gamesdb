import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { UserInterface } from '@/modules/user/user.types';

export class User extends Entity {
    name?: string;

    constructor(data: UserInterface) {
        super(data);
        this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    }
}
