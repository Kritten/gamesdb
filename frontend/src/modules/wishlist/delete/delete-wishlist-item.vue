<template>
  <base-entity-delete
    :entity="wishlistItem"
    i18n-prefix="wishlist"
    :use-delete-entity="useDeleteEntity"
    label
    @submit="deleted"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useDeleteWishlist } from '@/modules/wishlist/composables/useDeleteWishlist';
import BaseEntityDelete from '@/modules/app/base/entity/base-entity-delete.vue';
import { useRouter } from '@/router';

export default defineComponent({
  name: 'DeleteWishlistItem',
  components: { BaseEntityDelete },
  props: {
    wishlistItem: {
      required: true,
      type: Wishlist,
    },
  },
  emits: ['deleted'],
  setup() {
    return {
      useDeleteEntity: useDeleteWishlist,
      deleted() {
        void useRouter().push({ name: 'wishlist' });
      },
    };
  },
});
</script>

<style scoped>

</style>
