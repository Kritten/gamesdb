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
                    {{ t('rating.label') }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(data, index) in collectionStatisticsGamesBestRated.items
                    .value"
                :key="index"
            >
                <td class="text-left">
                    <link-game :game="data.game" />
                </td>
                <td class="text-right">
                    <template v-if="data.game !== null">
                        <template v-if="data.game.ratingAverage !== null">
                            <display-rating
                                dense
                                :rating="data.game.ratingAverage"
                            />
                            ({{ data.game.ratingCount }})
                        </template>
                        <template v-else>
                            {{ t('rating.none') }}
                        </template>
                    </template>
                </td>
            </tr>
        </tbody>
    </q-markup-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceStatistics } from '@/modules/statistics/statistics.service';
import { GamesBestRatedItem } from '@/modules/statistics/statistics.types';
import LinkGame from '@/modules/game/base/link-game.vue';
import DisplayRating from '@/modules/rating/base/display-rating.vue';

export default defineComponent({
    name: 'GamesBestRated',
    components: { DisplayRating, LinkGame },
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

        const collectionStatisticsGamesBestRated =
            useCollection<GamesBestRatedItem>(
                ServiceStatistics.loadPageStatisticsGamesBestRated,
                {
                    inputCollectionData: {
                        count: 5,
                        sortBy: ref(['ratingAverage']),
                        sortDesc: ref([true]),
                    },
                    payload: {
                        analogOnly: props.analogOnly,
                        digitalOnly: props.digitalOnly,
                    },
                }
            );

        return {
            t,
            collectionStatisticsGamesBestRated,
        };
    },
});
</script>

<style scoped></style>
