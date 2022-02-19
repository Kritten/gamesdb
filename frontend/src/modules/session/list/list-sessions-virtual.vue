<template>
    <q-markup-table flat>
        <thead>
            <tr>
                <th class="text-left">
                    {{ t('game.label') }}
                </th>
                <th class="text-right">
                    {{ t('player.label') }}
                </th>
                <th class="text-right">
                    {{ t('playtime.label') }}
                </th>
                <th />
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="session in collection.items.value"
                :key="session.id"
                :session="session"
            >
                <td>
                    {{ session.game === null ? '' : session.game.name }}
                </td>
                <td class="text-right">
                    {{ session.players.length }}
                </td>
                <td
                    class="text-right"
                    style="width: 1px"
                >
                    <span v-if="session.currentPlaytime !== undefined">
                        <display-playtime-current :session="session" />
                    </span>
                </td>
                <td style="width: 1px">
                    <update-session :session="session" />

                    <q-btn
                        v-if="session.currentPlaytime !== undefined"
                        color="warning"
                        icon="fas fa-pause"
                        class="q-ml-md"
                        flat
                        round
                        @click="useTrackSession.pause(session)"
                    >
                        <q-tooltip>
                            {{ t('session.pause') }}
                        </q-tooltip>
                    </q-btn>

                    <q-btn
                        v-if="session.currentPlaytime === undefined"
                        color="positive"
                        icon="fas fa-play"
                        class="q-ml-md"
                        flat
                        round
                        @click="useTrackSession.continue(session)"
                    >
                        <q-tooltip>
                            {{ t('session.continue') }}
                        </q-tooltip>
                    </q-btn>

                    <list-sessions-virtual-stop :session="session" />
                </td>
            </tr>
        </tbody>
    </q-markup-table>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType, ref, watch } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Session } from '@/modules/session/session.model';
import { queue } from '@/queue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import UpdateSession from '@/modules/session/update/update-session.vue';
import ListSessionsVirtualStop from '@/modules/session/list/list-sessions-virtual-stop.vue';
import DisplayPlaytimeCurrent from '@/modules/playtime/display-playtime-current.vue';

export default defineComponent({
    name: 'ListSessionsVirtual',
    components: {
        DisplayPlaytimeCurrent,
        ListSessionsVirtualStop,
        UpdateSession,
    },
    props: {
        refresh: {
            required: false,
            type: Object as PropType<{ callback: (() => void) | null }>,
            default: () => ({
                callback: () => {
                    // do nothing
                },
            }),
        },
    },
    setup(props) {
        const { t } = useI18n();
        const filters = ref<ServiceCollectionFilters>({
            isVirtual: {
                field: 'entity.isVirtual',
                valueBoolean: true,
                operator: '=',
            },
        });
        const collection = useCollection<Session>(ServiceSession.loadPage, {
            inputCollectionData: {
                sortBy: ref(['entity.id']),
                count: undefined,
                filters,
            },
        });

        const useTrackSession = ServiceSession.useTrackSession();

        // eslint-disable-next-line no-restricted-syntax
        for (const event of [
            'startedSessionVirtual',
            'continuedSession',
            'pausedSession',
            'stoppedSession',
            'updatedSession',
        ]) {
            queue.listen(event, () => {
                void collection.reset();
            });
        }

        watch(props.refresh, async () => {
            if (props.refresh.callback !== null) {
                await collection.reset();
                props.refresh.callback();
            }
        });

        return {
            t,
            collection,
            useTrackSession,
        };
    },
});
</script>

<style scoped></style>
