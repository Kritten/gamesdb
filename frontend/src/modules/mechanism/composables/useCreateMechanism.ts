import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { mutationCreateMechanism } from '@/modules/mechanism/graphql/mechanism.graphql';

export const useCreateMechanism = () => {
  const useCreateEntity = baseUseCreateEntity<Mechanism, { createMechanism: Mechanism }>({
    cls: Mechanism,
    setEntity: useMechanism().setMechanism,
    mutation: mutationCreateMechanism,
    nameMutation: 'createMechanism',
    nameVariable: 'mechanism',
  });

  return {
    ...useCreateEntity,
  };
};
