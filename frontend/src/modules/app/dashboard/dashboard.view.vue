<template>
    <draggable
        v-model="cardsDataOrdered"
        v-bind="{ animation: 150 }"
        handle=".v-card__title .card-handler"
        item-key="id"
        class="row q-col-gutter-md"
    >
        <template #item="{ element }">
            <data-card :card="element" />
        </template>
    </draggable>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import draggable from 'vuedraggable';
import { useI18n } from 'vue-i18n';
import GamesCountPlayed from '@/modules/statistics/components/games-count-played.vue';
import GamesTimePlayed from '@/modules/statistics/components/games-time-played.vue';
import GamesBestRated from '@/modules/statistics/components/games-best-rated.vue';
import PlaytimesPerDay from '@/modules/statistics/components/playtimes-per-day.vue';
import LastSession from '@/modules/statistics/components/last-session.vue';
import ListSessionsVirtual from '@/modules/session/list/list-sessions-virtual.vue';
import DataCard from '@/modules/app/dashboard/data-card.vue';
import type { TypeCardData } from '@/modules/app/dashboard/dashboard.types';

export default defineComponent({
    name: 'ViewDashboard',
    components: {
        draggable,
        DataCard,
    },
    setup() {
        const { t } = useI18n();

        const cardsDataOrder = [
            'playtimesPerDayAnalog',
            'playtimesPerDayDigital',
            'lastSessionAnalog',
            'lastSessionDigital',
            'listGamesByCountPlayedAnalog',
            'listGamesByCountPlayedDigital',
            'listGamesByTimePlayedAnalog',
            'listGamesByTimePlayedDigital',
            'listGamesBestRatedAnalog',
            'listGamesBestRatedDigital',
        ];

        const cardsData: Record<string, TypeCardData> = {
            playtimesPerDayAnalog: {
                header: t('dashboard.game.playtimesPerDayAnalog'),
                component: PlaytimesPerDay,
                props: {
                    analogOnly: true,
                },
                cols: 6,
                colsXl: 3,
                padding: true,
            },
            playtimesPerDayDigital: {
                header: t('dashboard.game.playtimesPerDayDigital'),
                component: PlaytimesPerDay,
                props: {
                    digitalOnly: true,
                },
                cols: 6,
                colsXl: 3,
                padding: true,
            },

            lastSessionAnalog: {
                header: t('dashboard.game.lastSessionAnalog'),
                component: LastSession,
                props: {
                    analogOnly: true,
                },
                cols: 6,
                colsXl: 3,
                padding: true,
            },
            lastSessionDigital: {
                header: t('dashboard.game.lastSessionDigital'),
                component: LastSession,
                props: {
                    digitalOnly: true,
                },
                cols: 6,
                colsXl: 3,
                padding: true,
            },

            listGamesByCountPlayedAnalog: {
                header: t('dashboard.game.mostPlayedAnalog'),
                component: GamesCountPlayed,
                props: {
                    analogOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },
            listGamesByCountPlayedDigital: {
                header: t('dashboard.game.mostPlayedDigital'),
                component: GamesCountPlayed,
                props: {
                    digitalOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },

            listGamesByTimePlayedAnalog: {
                header: t('dashboard.game.longestPlayedAnalog'),
                component: GamesTimePlayed,
                props: {
                    analogOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },
            listGamesByTimePlayedDigital: {
                header: t('dashboard.game.longestPlayedDigital'),
                component: GamesTimePlayed,
                props: {
                    digitalOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },

            listGamesBestRatedAnalog: {
                header: t('dashboard.game.bestRatedAnalog'),
                component: GamesBestRated,
                props: {
                    analogOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },
            listGamesBestRatedDigital: {
                header: t('dashboard.game.bestRatedDigital'),
                component: GamesBestRated,
                props: {
                    digitalOnly: true,
                },
                cols: 6,
                colsXl: 3,
            },
        };

        const cardsDataOrdered = computed(() =>
            cardsDataOrder.map((id) => {
                const cardData = cardsData[id];
                cardData.id = id;
                return cardData;
            })
        );

        return {
            t,
            cardsDataOrder,
            cardsDataOrdered,
        };
    },
});
</script>

<style scoped></style>
