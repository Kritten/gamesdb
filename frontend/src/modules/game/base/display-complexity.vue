<template>
  <q-rating
    :model-value="complexity + 1"
    icon="fas fa-weight-hanging"
    color="black"
    readonly
    size="1.5rem"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisplayComplexity',
  props: {
    complexity: {
      required: true,
      type: Number,
    },
  },
});
</script>

<style scoped>

</style>
