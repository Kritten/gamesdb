<template>
    <base-input-select-entity
        v-model="categoryInternal"
        :validation="validation"
        :items="categories"
        i18n-prefix="category"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';
import BaseInputSelectEntity from '@/modules/app/base/inputs/base-input-select-entity.vue';
import { useCategory } from '@/modules/category/composables/useCategory';
import { Category } from '@/modules/category/category.model';

export default defineComponent({
    name: 'InputSelectCategory',
    components: { BaseInputSelectEntity },
    props: {
        modelValue: {
            required: false,
            type: [Object, Array] as PropType<Category | Array<Category>>,
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
        const { categories } = useCategory();

        return {
            categories,
            categoryInternal: useModelWrapper({ props, emit }),
        };
    },
});
</script>

<style scoped></style>
