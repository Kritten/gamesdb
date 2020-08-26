import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateRating,
  mutationDeleteRating,
  mutationUpdateRating,
} from '@/modules/rating/graphql/rating.graphql';
import { Rating } from '@/modules/rating/rating.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';

export class ServiceRating {
  static useCreate() {
    let rating = ref(new Rating());

    return {
      rating,
      create: async () => {
        await ServiceRating.create(rating.value);
        rating.value = new Rating();
      },
    };
  }

  static useUpdate(ratingPassed: Rating) {
    let rating = ref(cloneDeep(ratingPassed));

    return {
      rating,
      update: async () => {
        rating.value = cloneDeep(await ServiceRating.update(rating.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (rating: Rating) => ServiceRating.delete(rating),
    };
  }

  static async create(rating: Rating) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateRating,
      variables: {
        rating,
      },
    });

    const ratingNew = await Rating.parseFromServer(response.data.createRating);
    store.commit('moduleRating/addRating', ratingNew);

    return ratingNew;
  }

  static async update(rating: Rating) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateRating,
      variables: {
        rating,
      },
    });

    const ratingNew = await Rating.parseFromServer(response.data.updateRating);
    store.commit('moduleRating/addRating', ratingNew);

    return ratingNew;
  }

  static async delete(rating: Rating) {
    await apolloClient.mutate({
      mutation: mutationDeleteRating,
      variables: {
        id: rating.id,
      },
    });

    store.commit('moduleRating/deleteRating', rating);
  }
}
