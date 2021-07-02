import { query } from '@/modules/app/utilities/helpers';
import { queryStatisticsCounts } from '@/modules/statistics/graphql/statistics.graphql';
import { useGame } from '@/modules/game/composables/useGame';
import { useRating } from '@/modules/rating/composables/useRating';

export const useStatistics = () => ({
  async loadStatisticsCounts() {
    const response = await query<{
      statisticsCounts: {gamesAnalog: number, gamesDigital: number, ratings: number
    }}>(queryStatisticsCounts);
    const { setCountTotalAnalog, setCountTotalDigital } = useGame();
    setCountTotalAnalog(response.statisticsCounts.gamesAnalog);
    setCountTotalDigital(response.statisticsCounts.gamesDigital);

    const { setCountTotal } = useRating();
    setCountTotal(response.statisticsCounts.ratings);
  },
});
