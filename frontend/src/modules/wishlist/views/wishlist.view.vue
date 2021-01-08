<template>
  <h1>{{ t('wishlist.label') }}</h1>
  <list-wishlist />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';

export default defineComponent({
  name: 'ViewWishlist',
  components: { ListWishlist },
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
