<template>
  <template v-if="wishlist !== null">
    <h1>{{ wishlist.name }}</h1>
    <ul>
      <li>{{ t('wishlist.price') }}: {{ wishlist.price }}</li>
      <li>{{ t('wishlist.link') }}: <a :href="wishlist.link">{{ wishlist.link }}</a></li>
    </ul>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';

export default defineComponent({
  name: 'ViewWishlistItem',
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idWishlist = route.params.id as string;
    const wishlist = ref<Wishlist | null>(null);

    ServiceWishlist.getOrLoad(idWishlist).then((value: Wishlist) => { wishlist.value = value; });
    return {
      t,
      wishlist,
    };
  },
});
</script>

<style scoped>

</style>
