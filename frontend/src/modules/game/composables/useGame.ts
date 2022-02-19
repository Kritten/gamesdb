import { ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { Game } from '@/modules/game/game.model';
import { GameInterface, GameLoading } from '@/modules/game/game.types';
import { queryGame } from '@/modules/game/graphql/game.graphql';
import { query } from '@/boot/apollo';

const countTotalAnalog = ref<number>();
const countTotalDigital = ref<number>();

const games = new Map<ID, GameLoading>();

export const useGame = () => {
    const setGame = (game: Game) => {
        const gameOld = games.get(game.id as ID);

        if (gameOld !== undefined) {
            gameOld.value = game;
        } else {
            // @ts-ignore
            games.set(game.id as ID, ref(game));
        }
    };

    return {
        setGame,
        deleteGame: (game: Game) => {
            console.error('HANDLE THIS');
            games.delete(game.id as ID);
        },

        // games,

        countTotalAnalog,
        countTotalDigital,
        setCountTotalAnalog(value: number) {
            countTotalAnalog.value = value;
        },
        setCountTotalDigital(value: number) {
            countTotalDigital.value = value;
        },

        get(id: ID): GameLoading {
            const gamePreloaded = games.get(id);

            if (gamePreloaded !== undefined) {
                return gamePreloaded;
            }

            const gameLoading: GameLoading = ref(null);

            games.set(id, gameLoading);

            void query<{ game: GameInterface }>(queryGame, {
                id,
            }).then(async (response) => {
                gameLoading.value = await Game.parseFromServer(response.game);
            });

            return gameLoading;
        },
    };
};
