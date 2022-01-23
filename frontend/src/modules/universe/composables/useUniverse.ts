import { computed, ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Universe } from '@/modules/universe/universe.model';

const universes = ref<Record<ID, Universe>>({});
const universesSortedByName = computed(() => Object.values(universes.value).sort(
  (a, b) => a.name.localeCompare(b.name),
));

export const useUniverse = () => {
  const useEntity = baseUseEntity<Universe>({
    entities: universes,
  });

  return {
    setUniverses: useEntity.setEntities,
    setUniverse: useEntity.setEntity,
    deleteUniverse: useEntity.deleteEntity,

    universes: universesSortedByName,
    universeById: (id: ID) => universes.value[id],
  };
};
