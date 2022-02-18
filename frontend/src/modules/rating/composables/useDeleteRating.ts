import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Rating } from '@/modules/rating/rating.model';
import { useRating } from '@/modules/rating/composables/useRating';
import { mutationDeleteRating } from '@/modules/rating/graphql/rating.graphql';

export const useDeleteRating = () => {
    const useDeleteEntity = baseUseDeleteEntity<
        Rating,
        { deleteRatings: Rating }
    >({
        deleteEntity: useRating().deleteRating,
        mutation: mutationDeleteRating,
        emits: ['deletedRating'],
    });

    return {
        ...useDeleteEntity,
    };
};
