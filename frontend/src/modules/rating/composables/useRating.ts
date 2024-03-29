import { ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Rating } from '@/modules/rating/rating.model';

const ratings = ref<Record<ID, Rating>>({});
const countTotal = ref<number>();

export const useRating = () => {
    const useEntity = baseUseEntity<Rating>({
        // TODO FIX this ts-ignore
        // @ts-ignore
        entities: ratings,
    });

    return {
        setRatings: useEntity.setEntities,
        setRating: useEntity.setEntity,
        deleteRating: useEntity.deleteEntity,

        ratings,

        countTotal,
        setCountTotal(value: number) {
            countTotal.value = value;
        },
    };
};
