import { computed, ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Mood } from '@/modules/mood/mood.model';

const moods = ref<Record<ID, Mood>>({});
const moodsSortedByLastPlayed = computed(() =>
    Object.values(moods.value).sort((a, b) => a.name.localeCompare(b.name))
);

export const useMood = () => {
    const useEntity = baseUseEntity<Mood>({
        entities: moods,
    });

    return {
        setMoods: useEntity.setEntities,
        setMood: useEntity.setEntity,
        deleteMood: useEntity.deleteEntity,

        moods: moodsSortedByLastPlayed,
        moodById: (id: ID) => moods.value[id],
    };
};
