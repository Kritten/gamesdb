import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateRating,
  mutationDeleteRating,
  mutationUpdateRating,
  queryPageRatings,
} from '@/modules/rating/graphql/rating.graphql';
import { Rating } from '@/modules/rating/rating.model';
import { cloneDeep } from 'lodash';
import { ServiceCollectionInterface } from '../app/utilities/collection/collection.types';
import { ServiceEntityInterface } from '../app/utilities/entity/entity.types';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';
import { queue } from '@/queue';

class ServiceRatingClass
  implements ServiceCollectionInterface<Rating>, ServiceEntityInterface<Rating> {
  useCreate() {
    let rating = ref(new Rating());

    return {
      entity: rating,
      create: async () => {
        const ratingNew = await this.create(rating.value);
        rating.value = new Rating();
        return ratingNew;
      },
    };
  }

  useUpdate(ratingPassed: Rating) {
    let rating = ref(cloneDeep(ratingPassed));

    return {
      entity: rating,
      update: async () => {
        rating.value = cloneDeep(await this.update(rating.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (rating: Rating) => this.delete(rating),
    };
  }

  async create(rating: Rating) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateRating,
      variables: {
        rating: rating.prepareForServer(),
      },
    });

    const ratingNew = await Rating.parseFromServer(response.data.createRating);

    queue.notify('createdRating', ratingNew);

    return ratingNew;
  }

  async update(rating: Rating) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateRating,
      variables: {
        rating: rating.prepareForServer(),
      },
    });

    const ratingNew = await Rating.parseFromServer(response.data.updateRating);

    queue.notify('updatedRating', ratingNew);

    return ratingNew;
  }

  async delete(rating: Rating) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteRating,
      variables: {
        id: rating.id,
      },
    });

    queue.notify('deletedRating', rating);

    return response.data.deleteRating;
  }

  async loadPage({ page, count, sortBy, sortDesc, filters }: InputCollection) {
    const response = await apolloClient.query({
      query: queryPageRatings,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        filters,
      },
    });

    const entities: Rating[] = await Promise.all(
      response.data.ratings.items.map((rating: Rating) => Rating.parseFromServer(rating)),
    );

    return {
      count: response.data.ratings.count,
      items: entities,
    };
  }
}

export const ServiceRating = new ServiceRatingClass();
