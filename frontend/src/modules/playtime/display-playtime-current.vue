<template>
  {{ result }}
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import {
  defineComponent, PropType, onUnmounted, ref,
} from 'vue';
import { Session } from '@/modules/session/session.model';
import { formatDistanceToNowStrict } from 'date-fns';
import { de } from 'date-fns/locale';

export default defineComponent({
  name: 'DisplayPlaytimeCurrent',
  props: {
    session: {
      required: true,
      type: Object as PropType<Session>,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const calculateResult = () => {
      if (props.session.currentPlaytime === undefined) {
        return '';
      }
      return formatDistanceToNowStrict(props.session.currentPlaytime.start, {
        locale: de,
      });
    };

    const result = ref(calculateResult());

    const idInterval = setInterval(() => {
      result.value = calculateResult();
    }, 1000);

    onUnmounted(() => {
      clearInterval(idInterval);
    });

    return {
      t,
      result,
      de,
    };
  },
});
</script>

<style scoped>

</style>
