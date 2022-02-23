<template>
    <q-markup-table dense flat>
        <thead>
            <tr>
                <th class="text-left">
                    {{ t('game.label') }}
                </th>
                <th class="text-right">
                    {{ t('common.date') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(data, index) in collectionStatisticsGamesLastPlayed
                    .items.value"
                :key="index"
            >
                <td class="text-left">
                    <link-game :game="data.game" />
                </td>
                <td class="text-right">
                    <base-date-time
                        :value="data.session.playtimes[0].end"
                    ></base-date-time>
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
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesLastPlayedItem } from '@/modules/statistics/statistics.types';
import LinkGame from '@/modules/game/base/link-game.vue';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';

export default defineComponent({
    name: 'GamesLastPlayed',
    components: { LinkGame, BaseDateTime },
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

        const collectionStatisticsGamesLastPlayed =
            useCollection<GamesLastPlayedItem>(
                ServiceStatistics.loadPageStatisticsGamesLastPlayed,
                {
                    inputCollectionData: {
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
            collectionStatisticsGamesLastPlayed,
        };
    },
});
</script>

<style scoped></style>
