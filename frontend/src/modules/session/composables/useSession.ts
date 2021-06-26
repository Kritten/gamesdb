import { ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Session } from '../session.model';

const sessions = ref<Record<ID, Session>>({});

export const useSession = () => {
  const useEntity = baseUseEntity<Session>({
    entities: sessions,
  });

  return {
    setSessions: useEntity.setEntities,
    setSession: useEntity.setEntity,
    deleteSession: useEntity.deleteEntity,
  };
};
