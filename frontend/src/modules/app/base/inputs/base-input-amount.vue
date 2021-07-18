<template>
  <base-input-number
    v-model="modelInternal"
    :validation="validation"
    :options="optionsMerged"
  >
    <template #append>
      <slot name="append">
        {{ `€` }}
      </slot>
    </template>
  </base-input-number>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator, useModelWrapper } from '@/modules/app/utilities/helpers';
import { Validation } from '@vuelidate/core';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';

export default defineComponent({
  name: 'BaseInputAmount',
  components: { BaseInputNumber },
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
    return {
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
