<template>
  <span
    v-if="value !==0"
    :title="dateFormattedStrict"
  >{{ dateFormatted }}</span>
  <span
    v-else
  > {{ t('playtime.unplayed') }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  formatDuration, formatDistance, intervalToDuration,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BaseDisplayDuration',
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const duration = intervalToDuration({ start: 0, end: props.value * 1000 });

    return {
      t,
      dateFormatted: computed(() => formatDistance(0, props.value * 1000, { locale: de, includeSeconds: true })),
      dateFormattedStrict: computed(() => formatDuration(duration, { locale: de })),
    };
  },
});
</script>

<style scoped>

</style>
