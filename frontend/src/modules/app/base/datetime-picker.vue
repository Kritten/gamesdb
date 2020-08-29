<template>
  <input
    v-model="valueInternal"
    type="datetime-local"
  >
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DatetimePicker',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
  },
  setup(props, { emit }) {
    const valueInternal = computed({
      // @ts-ignore
      get: () => props.modelValue.toISOString().substring(0, 16),
      set: (value) => emit('update:modelValue', new Date(value)),
    });

    return {
      valueInternal,
    };
  },
});
</script>

<style scoped>

</style>
