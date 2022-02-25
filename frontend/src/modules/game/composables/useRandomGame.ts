import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { ServiceGame } from '@/modules/game/game.service';
import { useRouter } from '@/router';

export const useRandomGame = ({
    filters,
}: {
    filters: ServiceCollectionFilters;
}) => {
    return {
        select: async () => {
            const games = await ServiceGame.loadPage({
                count: 1,
                filters: Object.values(filters).map((filter) => {
                    // TODO: This filter preprocessing ist also executed in the collection.ts
                    const filterNew = { ...filter };
                    if (typeof filter.valueBoolean === 'number') {
                        filterNew.valueBoolean = undefined;
                    }

                    if (filter.valueEntity !== undefined) {
                        // Wenn der Filter aus mehreren Werten besteht
                        if (Array.isArray(filter.valueEntity)) {
                            // Setze den Filter nur wenn es auch was zu Filtern gibt
                            if (filter.valueEntity.length > 0) {
                                filterNew.valueString = filter.valueEntity
                                    .map((entity) => entity.id)
                                    .join(',');
                                filterNew.operator = 'in';
                            }
                        } else {
                            filterNew.valueString = filter.valueEntity.id;
                        }
                        delete filterNew.valueEntity;
                    }

                    return filterNew;
                }),
                page: 1,
                sortBy: ['RAND()'],
                sortDesc: [],
            });

            const game = games.items[0];

            if (game.value !== null) {
                const router = useRouter();
                void router.push({
                    name: 'game',
                    params: {
                        id: game.value.id as string,
                    },
                });
            }
        },
    };
};
