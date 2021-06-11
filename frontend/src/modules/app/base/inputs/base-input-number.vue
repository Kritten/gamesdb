<template>
  <base-input-text
    v-model.number="modelInternal"
    :validation="validation"
    :options="optionsMerged"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator, useModelWrapper } from '@/modules/app/utilities/helpers';
import { Validation } from '@vuelidate/core';
import { useBaseInput } from '@/modules/app/base/inputs/base-input';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';

export default defineComponent({
  name: 'BaseInputNumber',
  components: { BaseInputText },
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
      );
    return {
      baseInput,
      modelInternal: useModelWrapper<number>({
        props, emit, name: 'modelValue',
      }),
      optionsMerged: computed(() => ({
        ...props.options,
        type: 'number',
      })),
    };
  },
});
</script>

<style scoped>

</style>
