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
                    {{ t('common.count') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(data, index) in collectionStatisticsGamesCountPlayed
                    .items.value"
                :key="index"
            >
                <td class="text-left">
                    <link-game :game="data.game" />
                </td>
                <td class="text-right">
                    {{ data.countPlayed }}
                </td>
            </tr>
        </tbody>
    </q-markup-table>

    <!--  <button-->
    <!--    v-if="collectionStatisticsGamesCountPlayed.hasNextPage.value"-->
    <!--    :disabled="collectionStatisticsGamesCountPlayed.isLoading.value === true"-->
    <!--    @click="collectionStatisticsGamesCountPlayed.loadNextItems"-->
    <!--  >-->
    <!--    Mehr laden-->
    <!--  </button>-->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesCountPlayedItem } from '@/modules/statistics/statistics.types';
import LinkGame from '@/modules/game/base/link-game.vue';

export default defineComponent({
    name: 'GamesCountPlayed',
    components: { LinkGame },
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

        const collectionStatisticsGamesCountPlayed =
            useCollection<GamesCountPlayedItem>(
                ServiceStatistics.loadPageStatisticsGamesCountPlayed,
                {
                    inputCollectionData: {
                        sortBy: ref(['countPlayed']),
                        sortDesc: ref([true]),
                        count: 5,
                    },
                    payload: {
                        analogOnly: props.analogOnly,
                        digitalOnly: props.digitalOnly,
                    },
                }
            );

        return {
            t,
            collectionStatisticsGamesCountPlayed,
        };
    },
});
</script>

<style scoped></style>
