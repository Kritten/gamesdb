<template>
  <q-markup-table
    dense
    flat
  >
    <thead>
      <tr>
        <th class="text-left">
          {{ t('game.label') }}
        </th>
        <th class="text-right">
          {{ t('playtime.label') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(data, index) in collectionStatisticsGamesTimePlayed.items.value"
        :key="index"
      >
        <td
          class="text-left"
        >
          <link-game :game="data.game" />
        </td>
        <td class="text-right">
          <base-display-duration :value="data.timePlayed" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>

<!--  <button-->
<!--    v-if="collectionStatisticsGamesTimePlayed.hasNextPage.value"-->
<!--    :disabled="collectionStatisticsGamesTimePlayed.isLoading.value === true"-->
<!--    @click="collectionStatisticsGamesTimePlayed.loadNextItems"-->
<!--  >-->
<!--    Mehr laden-->
<!--  </button>-->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import BaseDisplayDuration from '@/modules/app/base/base-display-duration.vue';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesTimePlayedItem } from '@/modules/statistics/statistics.types';
import { useI18n } from 'vue-i18n';
import LinkGame from '@/modules/game/base/link-game.vue';

export default defineComponent({
  name: 'GamesTimePlayed',
  components: { LinkGame, BaseDisplayDuration },
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
    const { t } = useI18n();

    const collectionStatisticsGamesTimePlayed = useCollection<GamesTimePlayedItem>(
      ServiceStatistics.loadPageStatisticsGamesTimePlayed,
      {
        inputCollectionData: {
          sortBy: ref(['timePlayed']),
          sortDesc: ref([true]),
          count: 5,
        },
        payload: {
          analogOnly: props.analogOnly,
          digitalOnly: props.digitalOnly,
        },
      },
    );

    return {
      t,
      collectionStatisticsGamesTimePlayed,
    };
  },
});
</script>

<style scoped>

</style>
