<template>
  <input
    v-model="valueInternal"
    type="datetime-local"
  >
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'DatetimePicker',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
  },
  setup(context, { emit }) {
    const valueInternal = computed({
      get: () => context.modelValue.toISOString().substring(0, 16),
      set: (value) => emit('update:modelValue', new Date(value)),
    });

    return {
      valueInternal,
    };
  },
};
</script>

<style scoped>

</style>
