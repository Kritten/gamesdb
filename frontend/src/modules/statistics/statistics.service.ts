import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { queryStatisticsGamesCountPlayed } from '@/modules/statistics/graphql/statistics.graphql';

class ServiceStatisticsClass {
  useGamesCountPlayed({
    analogOnly = false,
    digitalOnly = false,
  }: {
    analogOnly?: boolean;
    digitalOnly?: boolean;
  } = {}) {
    const statistics = ref([]);

    const filters = [];
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

    apolloClient
      .query({
        query: queryStatisticsGamesCountPlayed,
        variables: {
          page: 1,
          count: 10,
          sortBy: 'countPlayed',
          sortDesc: true,
          filters,
        },
      })
      .then(data => {
        statistics.value = data.data.statisticsGamesCountPlayed;
      });

    return { statistics };
  }
}

export const ServiceStatistics = new ServiceStatisticsClass();
