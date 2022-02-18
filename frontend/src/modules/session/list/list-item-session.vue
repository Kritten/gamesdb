<template>
    <tr>
        <td>
            {{ session.players.map((player) => player.name).join(', ') }}
        </td>
        <td>
            {{ session.winners.map((player) => player.name).join(', ') }}
        </td>
        <td class="text-center">
            <q-icon
                v-if="session.isChallenge"
                name="fa fa-check"
                color="positive"
            />
            <q-icon
                v-else
                name="fa fa-times"
            />
        </td>
        <td class="text-right">
            <base-date-time
                v-if="start"
                :value="start"
            />
        </td>
        <td class="text-right">
            <base-date-time
                v-if="end"
                :value="end"
            />
        </td>
        <td>
            <update-session
                :session="session"
                :game="game"
            />
            <delete-session :session="session" />
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { compareAsc, compareDesc } from 'date-fns';
import { Session } from '@/modules/session/session.model';
import DeleteSession from '@/modules/session/delete/delete-session.vue';
import UpdateSession from '@/modules/session/update/update-session.vue';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';
import { GameLoading } from '@/modules/game/game.types';

export default defineComponent({
    name: 'ListItemSession',
    components: {
        BaseDateTime,
        UpdateSession,
        DeleteSession,
    },
    props: {
        session: {
            required: true,
            type: Session,
        },
        game: {
            type: Object as PropType<GameLoading>,
            required: false,
            default: undefined,
        },
    },
    setup(props) {
        const starts = props.session.playtimes.map(
            (playtime) => playtime.start
        );
        const ends = props.session.playtimes
            .map((playtime) => playtime.end)
            .filter((value) => value !== null) as Array<Date>;

        const start = starts.sort((playtime1, playtime2) =>
            compareAsc(playtime1, playtime2)
        )[0];
        const end = ends.sort((playtime1, playtime2) =>
            compareDesc(playtime1, playtime2)
        )[0];

        return {
            start,
            end,
        };
    },
});
</script>

<style scoped></style>
