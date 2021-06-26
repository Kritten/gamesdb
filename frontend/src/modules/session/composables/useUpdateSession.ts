import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Session } from '@/modules/session/session.model';
import { mutationUpdateSession } from '@/modules/session/graphql/session.graphql';
import { useSession } from '@/modules/session/composables/useSession';

export const useUpdateSession = (sessionPassed: Session) => {
  const useUpdateEntity = baseUseUpdateEntity<Session, { updateSession: Session }>({
    cls: Session,
    entityPassed: sessionPassed,
    setEntity: useSession().setSession,
    mutation: mutationUpdateSession,
    nameMutation: 'updateSession',
    nameVariable: 'session',
    emits: ['updatedSession'],
  });

  return {
    ...useUpdateEntity,
  };
};
