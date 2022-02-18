import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Rating } from '@/modules/rating/rating.model';
import { useRating } from '@/modules/rating/composables/useRating';
import { mutationUpdateRating } from '@/modules/rating/graphql/rating.graphql';

export const useUpdateRating = (ratingPassed: Rating) => {
    const useUpdateEntity = baseUseUpdateEntity<
        Rating,
        { updateRating: Rating }
    >({
        cls: Rating,
        entityPassed: ratingPassed,
        setEntity: useRating().setRating,
        mutation: mutationUpdateRating,
        nameMutation: 'updateRating',
        nameVariable: 'rating',
        emits: ['updatedRating'],
    });

    return {
        ...useUpdateEntity,
    };
};
