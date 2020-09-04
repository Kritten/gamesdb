<template>
  <table border="1">
    <tr
      v-for="(data, index) in collectionStatisticsGamesCountPlayed.items.value"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td>{{ data.countPlayed }}</td>
    </tr>
  </table>

  <button
    v-if="collectionStatisticsGamesCountPlayed.hasNextPage.value"
    :disabled="collectionStatisticsGamesCountPlayed.isLoading.value === true"
    @click="collectionStatisticsGamesCountPlayed.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { GamesCountPlayedItem } from '@backend/src/modules/statistics/collection/gamesCountPlayed.collectionData.model';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';

export default defineComponent({
  name: 'GamesCountPlayed',
  props: {
    analogOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    digitalOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const collectionStatisticsGamesCountPlayed = useCollection<GamesCountPlayedItem>(
      ServiceStatistics.loadPageStatisticsGamesCountPlayed,
      {
        sortBy: 'countPlayed',
        sortDesc: true,
      },
      {
        analogOnly: props.analogOnly,
        digitalOnly: props.digitalOnly,
      },
    );

    return {
      collectionStatisticsGamesCountPlayed,
    };
  },
});
</script>

<style scoped>

</style>
