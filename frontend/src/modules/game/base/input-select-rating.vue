<template>
    <base-input-select
        v-model="ratingBGGInternal"
        :validation="validation"
        :options="{
            label: labelInternal,
            items: items,
            emitValue: true,
            mapOptions: true,
        }"
    />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useModelWrapper } from '@/modules/app/utilities/helpers';

export default defineComponent({
    name: 'InputSelectRating',
    components: { BaseInputSelect },
    props: {
        modelValue: {
            required: false,
            type: Number,
            default: undefined,
        },
        validation: {
            required: false,
            type: Object as PropType<Validation>,
            default: undefined,
        },
        label: {
            required: false,
            type: String,
            default: undefined,
        },
    },
    setup(props, { emit }) {
        const { t } = useI18n();

        const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => ({
            label: (value + 1).toString(),
            // label: t(`game.complexityFormatted.${value}`),
            value,
        }));

        const labelInternal = computed(() =>
            props.label === undefined ? t('rating.label') : props.label
        );

        return {
            t,
            items,
            labelInternal,
            ratingBGGInternal: useModelWrapper({ props, emit }),
        };
    },
});
</script>

<style scoped></style>
