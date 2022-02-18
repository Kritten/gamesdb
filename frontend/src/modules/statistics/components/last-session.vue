<template>
    <template v-if="lastSession.session.value !== undefined">
        <div class="row">
            <div class="col-shrink">
                <link-game :game="lastSession.session.value.game" />
            </div>
            <div class="col">
                &nbsp;am
                <base-date-time
                    :value="lastSession.lastDate.value"
                    date-only
                />
            </div>
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';
import LinkGame from '@/modules/game/base/link-game.vue';

export default defineComponent({
    name: 'LastSession',
    components: { LinkGame, BaseDateTime },
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
        const lastSession = ServiceSession.useLastSession({
            analogOnly: props.analogOnly,
            digitalOnly: props.digitalOnly,
        });
        return {
            lastSession,
        };
    },
});
</script>

<style scoped></style>
