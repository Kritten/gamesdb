<template>
  <span class="text-capitalize">
    {{ t(`game.sizeFormatted.${size}`) }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DisplaySize',
  props: {
    size: {
      required: true,
      type: Number,
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
