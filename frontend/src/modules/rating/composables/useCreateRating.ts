import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Rating } from '@/modules/rating/rating.model';
import { useRating } from '@/modules/rating/composables/useRating';
import { mutationCreateRating } from '@/modules/rating/graphql/rating.graphql';

export const useCreateRating = () => {
  const useCreateEntity = baseUseCreateEntity<Rating, { createRating: Rating }>({
    cls: Rating,
    setEntity: useRating().setRating,
    mutation: mutationCreateRating,
    nameMutation: 'createRating',
    nameVariable: 'rating',
    emits: ['createdRating'],
  });

  return {
    ...useCreateEntity,
  };
};
