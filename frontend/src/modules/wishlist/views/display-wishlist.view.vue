<template>
  <h1>{{ t('wishlist.label') }}</h1>
  <list-wishlist>
    <template #items="{ wishlistItems }">
      <template
        v-for="wishlistItem in wishlistItems"
        :key="wishlistItem.id"
      >
        <list-wishlist-item-extern :wishlist-item="wishlistItem" />
      </template>
    </template>
  </list-wishlist>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';
import ListWishlistItemExtern from '@/modules/wishlist/list/list-wishlist-item-extern.vue';

export default defineComponent({
  name: 'ViewDisplayWishlist',
  components: { ListWishlistItemExtern, ListWishlist },
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
