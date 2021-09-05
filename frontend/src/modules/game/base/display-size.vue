<template>
  <span
    v-if="size !== null"
    class="text-capitalize"
  >
    {{ t(`game.sizeFormatted.${size}`) }}
  </span>
  <span v-else>{{ t('common.notSpecified') }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getValidator } from '@/modules/app/utilities/helpers';

export default defineComponent({
  name: 'DisplaySize',
  props: {
    size: {
      required: true,
      validator: getValidator({
        number: true, null: true,
      }),
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style scoped>

</style>
