<template>
  {{ infoPlaytime }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DisplayPlaytimeGame',
  props: {
    minutesPlaytimeMin: {
      required: true,
      type: Number,
    },
    minutesPlaytimeMax: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const { t } = useI18n();

    return {
      infoPlaytime: computed(
        () => t('game.infoPlaytime', {
          minutesPlaytimeMin: props.minutesPlaytimeMin,
          minutesPlaytimeMax: props.minutesPlaytimeMax,
        }, props.minutesPlaytimeMin === props.minutesPlaytimeMax ? 1 : 2),
      ),
    };
  },
});
</script>

<style scoped>

</style>
