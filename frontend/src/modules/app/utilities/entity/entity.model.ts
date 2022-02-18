import {
    EntityInterface,
    ID,
} from '@/modules/app/utilities/entity/entity.types';

export class Entity implements EntityInterface {
    id?: ID;

    protected constructor(data: EntityInterface) {
        this.id = data.id;
    }

    static async convertFromServerToStore<T extends Entity>(
        data: EntityInterface[]
    ): Promise<{ [key: string]: T }> {
        const entities: T[] = await Promise.all(
            data.map(
                (item: EntityInterface) =>
                    this.parseFromServer(item) as Promise<T>
            )
        );

        return entities.reduce((obj, entity) => {
            obj[entity.id as ID] = entity;
            return obj;
        }, {} as { [key: string]: T });
    }

    static async parseFromServer(data: EntityInterface): Promise<Entity> {
        return new this(data);
    }

    prepareForServer(): { [key: string]: unknown } {
        return { id: this.id };
    }
}
