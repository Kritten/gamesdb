import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';
import { mutationDeleteWishlist } from '@/modules/wishlist/graphql/wishlist.graphql';

export const useDeleteWishlist = () => {
  const useDeleteEntity = baseUseDeleteEntity<Wishlist, { deleteWishlist: Wishlist }>({
    deleteEntity: useWishlist().deleteWishlistItem,
    mutation: mutationDeleteWishlist,
    emits: ['deletedWishlist'],
  });

  return {
    ...useDeleteEntity,
  };
};
