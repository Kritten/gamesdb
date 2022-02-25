<template>
    <q-btn
        flat
        icon="fas fa-random"
        padding="none md"
        color="primary"
        :label="$q.screen.gt.xs ? `${t('game.random.select')}` : undefined"
        @click="useRandomGame.select()"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRandomGame } from '@/modules/game/composables/useRandomGame';

export default defineComponent({
    name: 'RandomGame',
    props: {
        filters: {
            required: true,
            type: Object,
        },
    },
    setup(props) {
        return {
            t: useI18n().t,
            useRandomGame: useRandomGame({
                filters: props.filters,
            }),
        };
    },
});
</script>

<style scoped></style>
