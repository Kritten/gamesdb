<template>
  <template v-if="wishlistItem !== undefined">
    <h1>{{ wishlistItem.name }}</h1>
    <ul>
      <li>{{ t('wishlist.price') }}: <display-price-range :value="wishlistItem.price" /></li>
      <li>{{ t('wishlist.giftFor') }}: <display-gift-for :value="wishlistItem.giftFor" /></li>
      <li>{{ t('wishlist.description') }}: {{ wishlistItem.description }}</li>
      <li>{{ t('wishlist.link') }}: <a :href="wishlistItem.link">{{ wishlistItem.link }}</a></li>
    </ul>
    <hr>
    <details>
      <summary>Wunschlisteintrag bearbeiten</summary>
      <update-wishlist-item :wishlist-item="wishlistItem" />
    </details>
    <hr>
    <details>
      <summary>Wunschlisteintrag löschen</summary>
      <delete-wishlist-item
        :wishlist-item="wishlistItem"
        @deleted="deleted"
      />
    </details>
  </template>
</template>

<script lang="ts">
import {
  computed, defineComponent,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import DeleteWishlistItem from '@/modules/wishlist/delete/delete-wishlist-item.vue';

import UpdateWishlistItem from '@/modules/wishlist/update/update-wishlist-item.vue';
import DisplayPriceRange from '@/modules/wishlist/display/display-price-range.vue';
import DisplayGiftFor from '@/modules/wishlist/display/display-gift-for.vue';

export default defineComponent({
  name: 'ViewWishlistItem',
  components: {
    DisplayGiftFor, DisplayPriceRange, UpdateWishlistItem, DeleteWishlistItem,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idWishlist = route.params.id as string;

    ServiceWishlist.getOrLoad(idWishlist);

    return {
      t,
      // @ts-ignore
      // TODO
      wishlistItem: {},
      // wishlistItem: computed(() => store.state.moduleWishlist.wishlistItems[idWishlist]),
      deleted() {
        const router = useRouter();
        void router.push({ name: 'wishlist' });
      },
    };
  },
});
</script>

<style scoped>

</style>
