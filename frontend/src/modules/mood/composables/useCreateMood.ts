import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Mood } from '@/modules/mood/mood.model';
import { useMood } from '@/modules/mood/composables/useMood';
import { mutationCreateMood } from '@/modules/mood/graphql/mood.graphql';

export const useCreateMood = () => {
    const useCreateEntity = baseUseCreateEntity<Mood, { createMood: Mood }>({
        cls: Mood,
        setEntity: useMood().setMood,
        mutation: mutationCreateMood,
        nameMutation: 'createMood',
        nameVariable: 'mood',
    });

    return {
        ...useCreateEntity,
    };
};
