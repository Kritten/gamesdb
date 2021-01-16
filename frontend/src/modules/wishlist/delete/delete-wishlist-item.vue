<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';

export default defineComponent({
  name: 'DeleteWishlistItem',
  props: {
    wishlistItem: {
      required: true,
      type: Wishlist,
    },
  },
  emits: ['deleted'],
  setup(props, {emit}) {
    const { t } = useI18n();
    const deleteWishlistItem = ServiceWishlist.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Wunschlisteintrag ${props.wishlistItem.name} löschen?`);

      if (confirmed) {
        deleteWishlistItem.delete(props.wishlistItem).then(() => {
          emit('deleted');
        });
      }
    };

    return {
      t,
      confirmDelete,
    };
  },
});
</script>

<style scoped>

</style>
