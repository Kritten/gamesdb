import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { TypeBaseUseDeleteEntityParameters } from '@/modules/app/base/composables/baseEntity.types';
import { queue } from '@/queue';
import { mutate } from '@/boot/apollo';

export const baseUseDeleteEntity = <T extends Entity, P>({
    deleteEntity,
    mutation,
    emits = [],
}: TypeBaseUseDeleteEntityParameters<T>) => ({
    delete: async (entity: T) => {
        await mutate<P>(mutation, {
            id: entity.id,
        });

        deleteEntity(entity);

        emits.map((event) => queue.notify(event));

        return true;
    },
});
