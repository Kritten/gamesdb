import { Wishlist } from '@/modules/wishlist/wishlist.model';

interface StateInterface {
    wishlistItems: Record<string, Wishlist>;
}

const stateStore: StateInterface = {
    wishlistItems: {},
};

export const moduleWishlist = {
    namespaced: true,
    state: stateStore,
    mutations: {
        addWishlistItems(
            state: StateInterface,
            wishlistItems: Record<string, Wishlist>
        ) {
            Object.assign(state.wishlistItems, wishlistItems);
        },
        addWishlistItem(state: StateInterface, wishlistItem: Wishlist) {
            if (wishlistItem.id !== undefined) {
                state.wishlistItems[wishlistItem.id] = wishlistItem;
            }
        },
        deleteWishlistItem(state: StateInterface, wishlistItem: Wishlist) {
            if (wishlistItem.id !== undefined) {
                delete state.wishlistItems[wishlistItem.id];
            }
        },
    },
};
