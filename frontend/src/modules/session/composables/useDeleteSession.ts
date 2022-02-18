import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Session } from '@/modules/session/session.model';
import { useSession } from '@/modules/session/composables/useSession';
import { mutationDeleteSession } from '@/modules/session/graphql/session.graphql';

export const useDeleteSession = () => {
    const useDeleteEntity = baseUseDeleteEntity<
        Session,
        { deleteSessions: Session }
    >({
        deleteEntity: useSession().deleteSession,
        mutation: mutationDeleteSession,
        emits: ['deletedSession'],
    });

    return {
        ...useDeleteEntity,
    };
};
