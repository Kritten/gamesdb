import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { MechanismInterface } from '@/modules/mechanism/mechanism.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Mechanism extends Entity implements MechanismInterface {
    name: string;

    constructor(data: MechanismInterface = {}) {
        super(data);
        this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    }

    static async parseFromServer(data: EntityInterface): Promise<Mechanism> {
        const entity = (await super.parseFromServer(data)) as Mechanism;

        return entity;
    }

    prepareForServer() {
        const data = super.prepareForServer();

        data.name = this.name;

        return data;
    }
}
