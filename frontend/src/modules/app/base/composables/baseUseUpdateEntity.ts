import { Ref, ref } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { mutate } from '@/modules/app/utilities/helpers';
import { cloneDeep } from 'lodash';
import { TypeBaseUseUpdateEntityParameters } from '@/modules/app/base/composables/baseEntity.types';
import { queue } from '@/queue';

export const baseUseUpdateEntity = <T extends Entity, P>({
  entityPassed,
  cls,
  setEntity,
  mutation,
  nameMutation,
  nameVariable,
  emits = [],
}: TypeBaseUseUpdateEntityParameters<T, P>) => {
  const entity = ref(cloneDeep(entityPassed)) as Ref<T>;

  return {
    entity,
    update: async () => {
      const response = await mutate<P>(mutation, {
        [nameVariable]: entity.value.prepareForServer(),
      });

      const playerNew = (await cls.parseFromServer(response[nameMutation]));

      setEntity(playerNew);

      emits.map((event) => queue.notify(event));

      entity.value = cloneDeep(playerNew);
    },
  };
};
