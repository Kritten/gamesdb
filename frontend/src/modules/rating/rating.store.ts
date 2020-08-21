import { Rating } from '@/modules/rating/rating.model';

interface StateInterface {
  ratings: Rating[] | null;
}

export const moduleRating = {
  namespaced: true,
  state: {
    ratings: null,
  },
  mutations: {
    setRatings(state: StateInterface, ratings: Rating[]) {
      state.ratings = ratings;
    },
    addRating(state: StateInterface, rating: Rating) {
      if (state.ratings !== null && rating.id !== undefined) {
        state.ratings[rating.id] = rating;
      }
    },
    deleteRating(state: StateInterface, rating: Rating) {
      if (state.ratings !== null && rating.id !== undefined) {
        delete state.ratings[rating.id];
      }
    },
  },
};
