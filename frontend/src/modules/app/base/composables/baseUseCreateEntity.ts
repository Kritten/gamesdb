import { Ref, ref } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { mutate } from '@/modules/app/utilities/helpers';
import { TypeBaseUseCreateEntityParameters } from '@/modules/app/base/composables/baseEntity.types';
import { queue } from '@/queue';

export const baseUseCreateEntity = <T extends Entity, P>({
    cls: Cls,
    setEntity,
    mutation,
    nameMutation,
    nameVariable,
    emits = [],
    valuesInitial = {},
}: TypeBaseUseCreateEntityParameters<T, P>) => {
    const entity = ref(new Cls(valuesInitial)) as Ref<T>;

    return {
        entity,
        create: async () => {
            const response = await mutate<P>(mutation, {
                [nameVariable]: entity.value.prepareForServer(),
            });

            const entityNew = await Cls.parseFromServer(response[nameMutation]);

            setEntity(entityNew);

            emits.map((event) => queue.notify(event));

            entity.value = new Cls(valuesInitial);

            return entityNew;
        },
    };
};
