<template>
  <h1>{{ t('wishlist.label') }}</h1>
  <details>
    <summary>
      {{ t('wishlist.label') }} anlegen
    </summary>
    <create-wishlist />
  </details>
  <list-wishlist />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';
import CreateWishlist from "@/modules/wishlist/create/create-wishlist.vue";

export default defineComponent({
  name: 'ViewWishlist',
  components: {CreateWishlist, ListWishlist },
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
