<template>
  {{ dateFormatted }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { format } from 'date-fns';

export default defineComponent({
  name: 'BaseDate',
  props: {
    value: {
      required: true,
      type: Date,
    },
  },
  setup(props) {
    return {
      dateFormatted: computed(() => format(props.value as unknown as Date, 'dd.MM.yyyy')),
    };
  },
});
</script>

<style scoped>

</style>
