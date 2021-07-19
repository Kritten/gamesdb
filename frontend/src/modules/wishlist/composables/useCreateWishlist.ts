import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';
import { mutationCreateWishlist } from '@/modules/wishlist/graphql/wishlist.graphql';

export const useCreateWishlist = ({ valuesInitial = {} }: { valuesInitial?: Partial<Wishlist> } = {}) => {
  const useCreateEntity = baseUseCreateEntity<Wishlist, { createWishlist: Wishlist }>({
    cls: Wishlist,
    setEntity: useWishlist().setWishlistItem,
    mutation: mutationCreateWishlist,
    nameMutation: 'createWishlist',
    nameVariable: 'wishlist',
    emits: ['createdWishlistItem'],
    valuesInitial,
  });

  return {
    ...useCreateEntity,
  };
};
