<template>
    <q-rating
        v-if="complexity !== null"
        :model-value="complexity + 1"
        icon="fas fa-weight-hanging"
        color="black"
        readonly
        size="1.5rem"
    />
    <span v-else>{{ t('common.notSpecified') }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getValidator } from '@/modules/app/utilities/helpers';

export default defineComponent({
    name: 'DisplayComplexity',
    props: {
        complexity: {
            required: true,
            validator: getValidator({
                number: true,
                null: true,
            }),
        },
    },
    setup() {
        const { t } = useI18n();
        return {
            t,
        };
    },
});
</script>

<style scoped></style>
