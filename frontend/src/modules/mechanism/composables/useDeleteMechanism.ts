import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { mutationDeleteMechanism } from '@/modules/mechanism/graphql/mechanism.graphql';

export const useDeleteMechanism = () => {
    const useDeleteEntity = baseUseDeleteEntity<
        Mechanism,
        { deleteMechanism: Mechanism }
    >({
        deleteEntity: useMechanism().deleteMechanism,
        mutation: mutationDeleteMechanism,
    });

    return {
        ...useDeleteEntity,
    };
};
