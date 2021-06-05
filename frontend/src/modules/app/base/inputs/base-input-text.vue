<template>
  <q-input
    :model-value="modelValue"
    v-bind="optionsMerged"
    :error="baseInput.errorMessage.value !== ''"
    :error-message="baseInput.errorMessage.value"
    @update:model-value="baseInput.input"
  />
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue';
import { getValidator, toNumber } from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseInputText',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({
        number: true, string: true, null: true, undefined: true,
      }),
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
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const baseInput = useBaseInput<
      string | null,
      string | number | null
      >(
        props,
        emit,
        (value) => {
          if (props.options.type === 'number') {
            const valueParsed = typeof value === 'string' ? toNumber(value) : value;

            return typeof valueParsed !== 'number' ? null : valueParsed;
          }

          return value;
        },
      );

    return {
      baseInput,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
    };
  },
});
</script>

<style scoped>

</style>
