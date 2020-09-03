<template>
  {{ dateFormatted }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export default defineComponent({
  name: 'BaseDateTime',
  props: {
    value: {
      required: true,
      type: Date,
    },
    timeOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    dateOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formatDate = 'PPP';
    const formatTime = 'ppp';
    // const formatDate = 'dd.MM.yyyy';
    // const formatTime = 'HH:mm:ss';

    const getFormat = () => {
      let formatUsed = `${formatDate} ${formatTime}`;
      if (props.timeOnly) {
        formatUsed = formatTime;
      } else if (props.dateOnly) {
        formatUsed = formatDate;
      }
      return formatUsed;
    };

    return {
      dateFormatted: computed(() => format(props.value as unknown as Date, getFormat(), { locale: de })),
    };
  },
});
</script>

<style scoped>

</style>
