<template>
  {{ isCoop ? t('common.yes') : t('common.no') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DisplayIsCoop',
  props: {
    isCoop: {
      required: true,
      type: Boolean,
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
