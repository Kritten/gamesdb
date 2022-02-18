<template>
    <span>
        <base-date-time :value="start" />
    </span>
    <span> - </span>
    <span>
        <base-date-time :value="end" />
    </span>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';

export default defineComponent({
    name: 'DisplayPlaytime',
    components: { BaseDateTime },
    props: {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { t } = useI18n();

        return {
            t,
        };
    },
});
</script>

<style scoped></style>
