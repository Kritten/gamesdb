<template>
  <span :title="dateFormattedStrict">{{ dateFormatted }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  formatDuration, formatDistance, intervalToDuration,
} from 'date-fns';
import { de } from 'date-fns/locale';

export default defineComponent({
  name: 'BaseDisplayDuration',
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const duration = intervalToDuration({ start: 0, end: props.value * 1000 });

    return {
      dateFormatted: computed(() => formatDistance(0, props.value * 1000, { locale: de, includeSeconds: true })),
      dateFormattedStrict: computed(() => formatDuration(duration, { locale: de })),
    };
  },
});
</script>

<style scoped>

</style>
