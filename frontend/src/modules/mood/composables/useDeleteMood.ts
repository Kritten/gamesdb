import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Mood } from '@/modules/mood/mood.model';
import { useMood } from '@/modules/mood/composables/useMood';
import { mutationDeleteMood } from '@/modules/mood/graphql/mood.graphql';

export const useDeleteMood = () => {
  const useDeleteEntity = baseUseDeleteEntity<Mood, { deleteMood: Mood }>({
    deleteEntity: useMood().deleteMood,
    mutation: mutationDeleteMood,
  });

  return {
    ...useDeleteEntity,
  };
};
