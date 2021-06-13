import { computed, ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Mechanism } from '@/modules/mechanism/mechanism.model';

const mechanisms = ref<Record<ID, Mechanism>>({});
const mechanismsSortedByLastPlayed = computed(() => Object.values(mechanisms.value).sort(
  (a, b) => a.name.localeCompare(b.name),
));

export const useMechanism = () => {
  const useEntity = baseUseEntity<Mechanism>({
    entities: mechanisms,
  });

  return {
    setMechanisms: useEntity.setEntities,
    setMechanism: useEntity.setEntity,
    deleteMechanism: useEntity.deleteEntity,

    mechanisms: mechanismsSortedByLastPlayed,
    mechanismById: (id: ID) => mechanisms.value[id],
  };
};
