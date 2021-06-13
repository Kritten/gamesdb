import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Universe } from '@/modules/universe/universe.model';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { mutationCreateUniverse } from '@/modules/universe/graphql/universe.graphql';

export const useCreateUniverse = () => {
  const useCreateEntity = baseUseCreateEntity<Universe, { createUniverse: Universe }>({
    cls: Universe,
    setEntity: useUniverse().setUniverse,
    mutation: mutationCreateUniverse,
    nameMutation: 'createUniverse',
    nameVariable: 'universe',
  });

  return {
    ...useCreateEntity,
  };
};
