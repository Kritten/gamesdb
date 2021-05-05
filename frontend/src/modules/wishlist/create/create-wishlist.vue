<template>
  <form @submit.prevent="createWishlist.create">
    <item-wishlist
      v-model:name="createWishlist.entity.value.name"
      v-model:price="createWishlist.entity.value.price"
      v-model:taken="createWishlist.entity.value.taken"
      v-model:description="createWishlist.entity.value.description"
      v-model:link="createWishlist.entity.value.link"
      v-model:images="createWishlist.entity.value.images"
      v-model:gift-for="createWishlist.entity.value.giftFor"
      :hide-taken="true"
    />
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';

export default defineComponent({
  name: 'CreateWishlist',
  components: { ItemWishlist },
  setup() {
    const { t } = useI18n();
    const createWishlist = ServiceWishlist.useCreate();

    return {
      t,
      createWishlist,
    };
  },
});
</script>

<style scoped>

</style>
