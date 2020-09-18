import { apolloClient } from '@/vue-apollo';
import { ServiceCollectionInterface } from '@/modules/app/utilities/collection/collection.types';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';
import { Playtime } from './playtime.model';
import { queryPagePlaytime } from '@/modules/playtime/graphql/playtime.graphql';

class ServicePlaytimeClass implements ServiceCollectionInterface<Playtime> {
  async loadPage({ page, count, sortBy, sortDesc, filters, leftJoins }: InputCollection) {
    const response = await apolloClient.query({
      query: queryPagePlaytime,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        filters,
        leftJoins,
      },
    });

    const entities: Playtime[] = await Promise.all(
      response.data.playtimes.items.map((playtime: Playtime) => Playtime.parseFromServer(playtime)),
    );

    return {
      count: response.data.playtimes.count,
      items: entities,
    };
  }
}

export const ServicePlaytime = new ServicePlaytimeClass();
