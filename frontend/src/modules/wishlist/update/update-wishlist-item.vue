<template>
  <form @submit.prevent="updateWishlistItem.update">
    <item-wishlist
      v-model:name="updateWishlistItem.entity.value.name"
      v-model:price="updateWishlistItem.entity.value.price"
      v-model:taken="updateWishlistItem.entity.value.taken"
      v-model:link="updateWishlistItem.entity.value.link"
      v-model:images="updateWishlistItem.entity.value.images"
      :hide-taken="true"
    />
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';

export default defineComponent({
  name: 'UpdateWishlistItem',
  components: { ItemWishlist },
  props: {
    wishlistItem: {
      required: true,
      type: Wishlist,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateWishlistItem = ServiceWishlist.useUpdate(context.wishlistItem);

    return {
      t,
      updateWishlistItem,
    };
  },
});
</script>

<style scoped>

</style>
