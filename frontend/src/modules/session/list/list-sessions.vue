<template>
    <q-markup-table
        border="1"
        flat
    >
        <thead>
            <tr>
                <th class="text-left">
                    {{ t('player.label', 2) }}
                </th>
                <th class="text-left">
                    {{ t('winner.label', 2) }}
                </th>
                <th>{{ t('session.isChallenge') }}</th>
                <th class="text-right">
                    {{ t('playtime.start') }}
                </th>
                <th class="text-right">
                    {{ t('playtime.end') }}
                </th>
                <th style="width: 1px" />
            </tr>
        </thead>
        <tbody>
            <list-item-session
                v-for="(session, index) in collection.items.value"
                :key="session.id"
                v-intersection.once="
                    collection.items.value.length - index === 10 &&
                    onIntersection
                "
                :session="session"
                :game="game"
            />
        </tbody>
    </q-markup-table>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref, watch } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import ListItemSession from '@/modules/session/list/list-item-session.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Session } from '@/modules/session/session.model';
import { Game } from '@/modules/game/game.model';
import { queue } from '@/queue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
    name: 'ListSession',
    components: { ListItemSession },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    emits: ['updatedCountItems'],
    setup(props, { emit }) {
        const { t } = useI18n();
        const filters = ref<ServiceCollectionFilters>({
            game: {
                field: 'entity.gameId',
                valueString: props.game.id,
                operator: '=',
            },
            isVirtual: {
                field: 'entity.isVirtual',
                valueBoolean: false,
                operator: '=',
            },
        });

        const sortBy = ref<string[]>(['entity.id']);
        // const sortBy = ref<string[]>(['entity.playtime']);
        const sortDesc = ref<boolean[]>([true]);

        const collection = useCollection<Session>(ServiceSession.loadPage, {
            inputCollectionData: {
                sortBy,
                sortDesc,
                filters,
                count: 10,
            },
        });

        watch(collection.countItems, () => {
            emit('updatedCountItems', collection.countItems.value);
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const event of [
            'createdSession',
            'updatedSession',
            'deletedSession',
        ]) {
            queue.listen(event, () => {
                void collection.reset();
            });
        }

        return {
            t,
            collection,
            onIntersection(entry: { isIntersecting: boolean }) {
                if (
                    entry.isIntersecting === true &&
                    collection.hasNextPage.value
                ) {
                    void collection.loadNextItems();
                }
            },
        };
    },
});
</script>

<style scoped></style>
