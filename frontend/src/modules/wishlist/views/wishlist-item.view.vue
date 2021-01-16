<template>
  <template v-if="wishlistItem !== null">
    <h1>{{ wishlistItem.name }}</h1>
    <ul>
      <li>{{ t('wishlist.price') }}: {{ wishlistItem.price }}</li>
      <li>{{ t('wishlist.link') }}: <a :href="wishlistItem.link">{{ wishlistItem.link }}</a></li>
    </ul>

    <delete-wishlist-item
      :wishlist-item="wishlistItem"
      @deleted="deleted"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import DeleteWishlistItem from '@/modules/wishlist/delete/delete-wishlist-item.vue';
import { router } from '@/modules/app/app.router';

export default defineComponent({
  name: 'ViewWishlistItem',
  components: { DeleteWishlistItem },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idWishlist = route.params.id as string;
    const wishlistItem = ref<Wishlist | null>(null);

    ServiceWishlist.getOrLoad(idWishlist).then((value: Wishlist) => { wishlistItem.value = value; });
    return {
      t,
      wishlistItem,
      deleted() {
        router.push({ name: 'wishlist' });
      },
    };
  },
});
</script>

<style scoped>

</style>
