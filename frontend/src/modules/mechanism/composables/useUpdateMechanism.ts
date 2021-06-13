import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { mutationUpdateMechanism } from '@/modules/mechanism/graphql/mechanism.graphql';

export const useUpdateMechanism = (mechanismPassed: Mechanism) => {
  const useUpdateEntity = baseUseUpdateEntity<Mechanism, { updateMechanism: Mechanism }>({
    cls: Mechanism,
    entityPassed: mechanismPassed,
    setEntity: useMechanism().setMechanism,
    mutation: mutationUpdateMechanism,
    nameMutation: 'updateMechanism',
    nameVariable: 'mechanism',
  });

  return {
    ...useUpdateEntity,
  };
};
