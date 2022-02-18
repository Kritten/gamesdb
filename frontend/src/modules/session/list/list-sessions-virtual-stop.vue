<template>
    <base-dialog
        :title="`${t('session.stop')}`"
        :text-submit="t('session.stop')"
        :validation="vuelidate"
        @submit="submit"
    >
        <template #activator="{ open }">
            <q-btn
                icon="fas fa-stop"
                color="negative"
                flat
                round
                @click="open"
            >
                <q-tooltip>
                    {{ t('session.stop') }}
                </q-tooltip>
            </q-btn>
        </template>

        <item-session
            v-model:game="updateSession.entity.value.game"
            v-model:comment="updateSession.entity.value.comment"
            v-model:is-challenge="updateSession.entity.value.isChallenge"
            v-model:players="updateSession.entity.value.players"
            v-model:winners="updateSession.entity.value.winners"
            v-model:playtimes="updateSession.entity.value.playtimes"
            :validation="vuelidate"
        />
    </base-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { isEqual } from 'date-fns';
import { ServiceSession } from '@/modules/session/session.service';
import { Session } from '@/modules/session/session.model';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import ItemSession from '@/modules/session/item-session.vue';
import { useUpdateSession } from '@/modules/session/composables/useUpdateSession';

export default defineComponent({
    name: 'ListSessionsVirtualStop',
    components: { ItemSession, BaseDialog },
    props: {
        session: {
            required: true,
            type: Session,
        },
    },
    setup(props) {
        const { t } = useI18n();

        const useTrackSession = ServiceSession.useTrackSession();
        const updateSession = useUpdateSession(props.session);

        const vuelidate = useVuelidate(
            computed(() => ({
                game: {
                    required,
                },
                players: {
                    required,
                },
                playtimes: {
                    required,
                },
            })),
            updateSession.entity
        );

        return {
            t,
            updateSession,
            vuelidate,
            isEqual,
            async submit(close: () => void) {
                await useTrackSession.stop(updateSession.entity.value);
                close();
            },
        };
    },
});
</script>

<style scoped></style>
