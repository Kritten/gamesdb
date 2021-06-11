import { query } from '@/modules/app/utilities/helpers';
import { queryStatisticsCounts } from '@/modules/statistics/graphql/statistics.graphql';
import { useGames } from '@/modules/game/composables/useGames';

export const useStatistics = () => ({
  async loadStatisticsCounts() {
    const response = await query<{statisticsCounts: {gamesAnalog: number, gamesDigital: number}}>(queryStatisticsCounts);
    const { setCountTotalAnalog, setCountTotalDigital } = useGames();
    setCountTotalAnalog(response.statisticsCounts.gamesAnalog);
    setCountTotalDigital(response.statisticsCounts.gamesDigital);
  },
});
