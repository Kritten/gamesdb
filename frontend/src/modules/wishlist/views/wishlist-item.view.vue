<template>
  <h1>{{ t('wishlist.item.label') }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ViewWishlistItem',
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