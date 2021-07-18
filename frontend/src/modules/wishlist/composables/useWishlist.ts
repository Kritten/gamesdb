import { ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { required } from '@vuelidate/validators';

const wishlistItems = ref<Record<ID, Wishlist>>({});
const countTotal = ref<number>();

export const useWishlist = () => {
  const useEntity = baseUseEntity<Wishlist>({
    // TODO FIX this ts-ignore
    // @ts-ignore
    entities: wishlistItems,
  });

  return {
    setWishlistItems: useEntity.setEntities,
    setWishlistItem: useEntity.setEntity,
    deleteWishlistItem: useEntity.deleteEntity,

    wishlistItems,

    countTotal,
    setCountTotal(value: number) {
      countTotal.value = value;
    },

    validation: {
      create: () => ({
        name: {
          required,
        },
        price: {
          required,
        },
        taken: {
          required,
        },
        description: {
          required,
        },
        link: {
          required,
        },
        giftFor: {
          required,
        },
        images: {
          required,
        },
      }),
    },
  };
};
