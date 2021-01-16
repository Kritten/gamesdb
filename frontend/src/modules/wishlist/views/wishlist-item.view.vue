<template>
  <template v-if="wishlistItem !== undefined">
    <h1>{{ wishlistItem.name }}</h1>
    <ul>
      <li>{{ t('wishlist.price') }}: {{ wishlistItem.price }}</li>
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
import { useRoute } from 'vue-router';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import DeleteWishlistItem from '@/modules/wishlist/delete/delete-wishlist-item.vue';
import { router } from '@/modules/app/app.router';
import UpdateWishlistItem from '@/modules/wishlist/update/update-wishlist-item.vue';
import { store } from '@/modules/app/app.store';

export default defineComponent({
  name: 'ViewWishlistItem',
  components: { UpdateWishlistItem, DeleteWishlistItem },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idWishlist = route.params.id as string;

    ServiceWishlist.getOrLoad(idWishlist);

    return {
      t,
      // @ts-ignore
      wishlistItem: computed(() => store.state.moduleWishlist.wishlistItems[idWishlist]),
      deleted() {
        router.push({ name: 'wishlist' });
      },
    };
  },
});
</script>

<style scoped>

</style>
