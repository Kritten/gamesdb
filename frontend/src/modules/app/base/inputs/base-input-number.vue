<template>
  <base-input-text
    :model-value="modelValue"
    :validation="validation"
    :options="optionsMerged"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
import { Validation } from '@vuelidate/core';
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
  setup(props) {
    return {
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
