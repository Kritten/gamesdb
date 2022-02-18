import { query } from '@/modules/app/utilities/helpers';
import { queryStatisticsCounts } from '@/modules/statistics/graphql/statistics.graphql';
import { useGame } from '@/modules/game/composables/useGame';
import { useRating } from '@/modules/rating/composables/useRating';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';

export const useStatistics = () => ({
    async loadStatisticsCounts() {
        const response = await query<{
            statisticsCounts: {
                gamesAnalog: number;
                gamesDigital: number;
                ratings: number;
                wishlists: number;
            };
        }>(queryStatisticsCounts);
        const { setCountTotalAnalog, setCountTotalDigital } = useGame();
        setCountTotalAnalog(response.statisticsCounts.gamesAnalog);
        setCountTotalDigital(response.statisticsCounts.gamesDigital);

        const { setCountTotal: setCountTotalRating } = useRating();
        setCountTotalRating(response.statisticsCounts.ratings);

        const { setCountTotal: setCountTotalWishlist } = useWishlist();
        setCountTotalWishlist(response.statisticsCounts.wishlists);
    },
});
