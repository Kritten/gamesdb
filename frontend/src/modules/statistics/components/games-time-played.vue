<template>
  <table border="1">
    <tr
      v-for="(data, index) in collectionStatisticsGamesTimePlayed.items.value"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td><base-display-duration :value="data.timePlayed" /></td>
    </tr>
  </table>

  <button
    v-if="collectionStatisticsGamesTimePlayed.hasNextPage.value"
    :disabled="collectionStatisticsGamesTimePlayed.isLoading.value === true"
    @click="collectionStatisticsGamesTimePlayed.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import BaseDisplayDuration from '@/modules/app/base/base-display-duration.vue';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesTimePlayedItem } from '@/modules/statistics/statistics.types';

export default defineComponent({
  name: 'GamesTimePlayed',
  components: { BaseDisplayDuration },
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
    const collectionStatisticsGamesTimePlayed = useCollection<GamesTimePlayedItem>(
      ServiceStatistics.loadPageStatisticsGamesTimePlayed,
      {
        inputCollectionData: {
          sortBy: ref(['timePlayed']),
          sortDesc: ref([true]),
        },
        payload: {
          analogOnly: props.analogOnly,
          digitalOnly: props.digitalOnly,
        },
      },
    );

    return {
      collectionStatisticsGamesTimePlayed,
    };
  },
});
</script>

<style scoped>

</style>
