<template>
  <h1>{{ t('wishlist.label') }}</h1>
  test
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewDisplayWishlist',
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
