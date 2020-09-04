import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { queryStatisticsGamesCountPlayed } from '@/modules/statistics/graphql/statistics.graphql';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';

class ServiceStatisticsClass {
  async loadPageStatisticsGamesCountPlayed(
    { page, count, sortBy, sortDesc, filters }: InputCollection,
    payload: unknown = {},
  ) {
    const { analogOnly = false, digitalOnly = false } = payload as {
      analogOnly?: boolean;
      digitalOnly?: boolean;
    };

    if (analogOnly) {
      filters.push({
        field: 'isDigital',
        valueBoolean: false,
        operator: '=',
      });
    } else if (digitalOnly) {
      filters.push({
        field: 'isDigital',
        valueBoolean: true,
        operator: '=',
      });
    }

    const response = await apolloClient.query({
      query: queryStatisticsGamesCountPlayed,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        filters,
      },
    });

    return {
      count: response.data.statisticsGamesCountPlayed.count,
      items: response.data.statisticsGamesCountPlayed.items,
    };
  }
}

export const ServiceStatistics = new ServiceStatisticsClass();
