<template>
  <table border="1">
    <tr
      v-for="(data, index) in collectionStatisticsGamesBestRated.items.value"
      :key="index"
    >
      <td>{{ data.name }}</td>
      <td v-if="data.rating !== null">
        {{ data.rating.toFixed(2) }} ({{ data.count }})
      </td>
      <td v-else>
        -
      </td>
    </tr>
  </table>

  <button
    v-if="collectionStatisticsGamesBestRated.hasNextPage.value"
    :disabled="collectionStatisticsGamesBestRated.isLoading.value === true"
    @click="collectionStatisticsGamesBestRated.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesBestRatedItem } from '@/modules/statistics/statistics.types';

export default defineComponent({
  name: 'GamesBestRated',
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
    const collectionStatisticsGamesBestRated = useCollection<GamesBestRatedItem>(
      ServiceStatistics.loadPageStatisticsGamesBestRated,
      {
        inputCollectionData: {
          sortBy: ref(['rating']),
          sortDesc: ref([true]),
        },
        payload: {
          analogOnly: props.analogOnly,
          digitalOnly: props.digitalOnly,
        },
      },
    );

    return {
      collectionStatisticsGamesBestRated,
    };
  },
});
</script>

<style scoped>

</style>
