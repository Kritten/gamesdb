import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Universe } from '@/modules/universe/universe.model';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { mutationDeleteUniverse } from '@/modules/universe/graphql/universe.graphql';

export const useDeleteUniverse = () => {
  const useDeleteEntity = baseUseDeleteEntity<Universe, { deleteUniverse: Universe }>({
    deleteEntity: useUniverse().deleteUniverse,
    mutation: mutationDeleteUniverse,
  });

  return {
    ...useDeleteEntity,
  };
};
