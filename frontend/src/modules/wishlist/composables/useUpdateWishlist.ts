import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';
import { mutationUpdateWishlist } from '@/modules/wishlist/graphql/wishlist.graphql';

export const useUpdateWishlist = (wishlistItemPassed: Wishlist) => {
    const useUpdateEntity = baseUseUpdateEntity<
        Wishlist,
        { updateWishlist: Wishlist }
    >({
        cls: Wishlist,
        entityPassed: wishlistItemPassed,
        setEntity: useWishlist().setWishlistItem,
        mutation: mutationUpdateWishlist,
        nameMutation: 'updateWishlist',
        nameVariable: 'wishlist',
        emits: ['updatedWishlistItem'],
    });

    return {
        ...useUpdateEntity,
    };
};
