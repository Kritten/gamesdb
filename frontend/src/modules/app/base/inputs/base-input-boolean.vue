<template>
  <div>
    {{ optionsMerged.label }}
  </div>
  <label>
    <input
      v-model="modelValueInternal"
      :name="name"
      :value="true"
      type="radio"
    >
    {{ t('common.yes') }}
  </label>
  <label>
    <input
      v-model="modelValueInternal"
      :name="name"
      :value="false"
      type="radio"
    >
    {{ t('common.no') }}
  </label>
  <label v-if="canBeUndefined === true">
    <input
      v-model="modelValueInternal"
      :name="name"
      :value="undefined"
      type="radio"
    >
    {{ t('common.undefined') }}
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getValidator, toNumber, useId, useModelWrapper,
} from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseInputBoolean',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({ boolean: true, undefined: true }),
    },
    canBeUndefined: {
      required: false,
      type: Boolean,
      default: false,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    options: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const baseInput = useBaseInput<
      boolean | undefined,
      boolean | undefined
      >(
        props,
        emit,
      );

    return {
      t,
      modelValueInternal: useModelWrapper({
        props, emit, name: 'modelValue',
      }),
      baseInput,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
      name: useId().generate(),
    };
  },
});
</script>

<style scoped>

</style>
