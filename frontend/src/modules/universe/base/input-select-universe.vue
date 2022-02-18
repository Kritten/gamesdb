<template>
    <base-input-select-entity
        v-model="universeInternal"
        :validation="validation"
        :items="universes"
        i18n-prefix="universe"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { Universe } from '@/modules/universe/universe.model';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';
import BaseInputSelectEntity from '@/modules/app/base/inputs/base-input-select-entity.vue';

export default defineComponent({
    name: 'InputSelectUniverse',
    components: { BaseInputSelectEntity },
    props: {
        modelValue: {
            required: false,
            type: [Object, Array] as PropType<Universe | Array<Universe>>,
            default: undefined,
        },
        validation: {
            required: false,
            type: Object as PropType<Validation>,
            default: undefined,
        },
        options: {
            required: false,
            type: Object as PropType<Partial<TypeOptionsInput>>,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const { universes } = useUniverse();

        return {
            universes,
            universeInternal: useModelWrapper({ props, emit }),
        };
    },
});
</script>

<style scoped></style>
