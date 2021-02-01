<template>
  <el-form
    v-bind="state.optionsForm"
    style="margin-top: 1rem;"
    @submit.prevent="updateWishlistItem.update"
  >
    <item-wishlist
      v-model:name="updateWishlistItem.entity.value.name"
      v-model:price="updateWishlistItem.entity.value.price"
      v-model:taken="updateWishlistItem.entity.value.taken"
      v-model:link="updateWishlistItem.entity.value.link"
      v-model:images="updateWishlistItem.entity.value.images"
      v-model:gift-for="updateWishlistItem.entity.value.giftFor"
      :hide-taken="true"
    />
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { useStore } from 'vuex';

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
    const { state } = useStore();
    const updateWishlistItem = ServiceWishlist.useUpdate(context.wishlistItem);

    return {
      t,
      state,
      updateWishlistItem,
    };
  },
});
</script>

<style scoped>

</style>
