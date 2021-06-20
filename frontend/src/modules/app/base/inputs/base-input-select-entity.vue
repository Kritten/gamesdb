<template>
  <base-input-select
    v-model="entityInternal"
    :options="optionsMerged"
    :validation="validation"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export default defineComponent({
  name: 'BaseInputSelectEntity',
  components: { BaseInputSelect },
  props: {
    modelValue: {
      required: false,
      type: [Object, Array] as PropType<Entity | Array<Entity>>,
      default: undefined,
    },
    items: {
      required: true,
      type: Array as PropType<Array<Entity>>,
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
    i18nPrefix: {
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    return {
      t,
      optionsMerged: computed(() => ({
        label: t(`${props.i18nPrefix}.label`, Array.isArray(props.modelValue) ? 2 : 1),
        items: props.items,
        useInput: true,
        optionValue: 'id',
        optionLabel: 'name',
        clearable: true,
        ...props.options,
      })),
      entityInternal: useModelWrapper({ props, emit }),
    };
  },
});
</script>

<style scoped>

</style>
