import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Session } from '@/modules/session/session.model';
import { useSession } from '@/modules/session/composables/useSession';
import { mutationCreateSession } from '@/modules/session/graphql/session.graphql';

export const useCreateSession = ({
    valuesInitial = {},
}: { valuesInitial?: Partial<Session> } = {}) => {
    const useCreateEntity = baseUseCreateEntity<
        Session,
        { createSession: Session }
    >({
        cls: Session,
        setEntity: useSession().setSession,
        mutation: mutationCreateSession,
        nameMutation: 'createSession',
        nameVariable: 'session',
        emits: ['createdSession'],
        valuesInitial,
    });

    return {
        ...useCreateEntity,
    };
};
