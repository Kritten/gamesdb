import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Universe } from '@/modules/universe/universe.model';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { mutationUpdateUniverse } from '@/modules/universe/graphql/universe.graphql';

export const useUpdateUniverse = (universePassed: Universe) => {
    const useUpdateEntity = baseUseUpdateEntity<
        Universe,
        { updateUniverse: Universe }
    >({
        cls: Universe,
        entityPassed: universePassed,
        setEntity: useUniverse().setUniverse,
        mutation: mutationUpdateUniverse,
        nameMutation: 'updateUniverse',
        nameVariable: 'universe',
    });

    return {
        ...useUpdateEntity,
    };
};
