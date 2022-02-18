import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Mood } from '@/modules/mood/mood.model';
import { useMood } from '@/modules/mood/composables/useMood';
import { mutationUpdateMood } from '@/modules/mood/graphql/mood.graphql';

export const useUpdateMood = (moodPassed: Mood) => {
    const useUpdateEntity = baseUseUpdateEntity<Mood, { updateMood: Mood }>({
        cls: Mood,
        entityPassed: moodPassed,
        setEntity: useMood().setMood,
        mutation: mutationUpdateMood,
        nameMutation: 'updateMood',
        nameVariable: 'mood',
    });

    return {
        ...useUpdateEntity,
    };
};
