import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import {
    mutationUpdateWishlistTaken,
    queryPageWishlist,
    queryWishlistItem,
} from '@/modules/wishlist/graphql/wishlist.graphql';
import { GIFT_FOR, PRICE_RANGE } from '@/modules/wishlist/wishlist.constants';
import {
    InputCollection,
    ServiceCollectionInterface,
    ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import { WishlistInterface } from '@/modules/wishlist/wishlist.types';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';
import { ID } from '../app/utilities/entity/entity.types';
import { mutate, query } from '@/boot/apollo';

class ServiceWishlistClass implements ServiceCollectionInterface<Wishlist> {
    async updateTaken(wishlist: Wishlist) {
        const response = await mutate<{ updateWishlistTaken: Wishlist }>(
            mutationUpdateWishlistTaken,
            {
                wishlist: wishlist.prepareForServer(),
            }
        );

        const wishlistNew = await Wishlist.parseFromServer(
            response.updateWishlistTaken
        );

        // TODO
        // store.commit('moduleWishlist/addWishlistItem', wishlistNew);

        queue.notify('updatedWishlistItem', wishlistNew);

        return wishlistNew;
    }

    async getOrLoad(id: ID) {
        const { wishlistItems, setWishlistItem } = useWishlist();

        let wishlistItem = wishlistItems.value[id];

        if (wishlistItem === undefined) {
            const response = await query<{ wishlist: WishlistInterface }>(
                queryWishlistItem,
                {
                    id,
                }
            );

            wishlistItem = await Wishlist.parseFromServer(response.wishlist);

            setWishlistItem(wishlistItem);
        }

        return wishlistItem;
    }

    async loadPage(data: InputCollection) {
        return loadPageBase<
            Wishlist,
            { wishlists: ServiceCollectionLoadPage<Wishlist> }
        >({
            data,
            query: queryPageWishlist,
            parseResult: async (response) => ({
                items: await Promise.all(
                    response.wishlists.items.map((wishlist: Wishlist) =>
                        Wishlist.parseFromServer(wishlist)
                    )
                ),
                count: response.wishlists.count,
            }),
        });
    }

    getItemsPriceRange() {
        const { t } = useI18n();
        return [
            {
                value: PRICE_RANGE.UpToTen,
                label: t(`wishlist.priceRange.${PRICE_RANGE.UpToTen}`),
            },
            {
                value: PRICE_RANGE.UpToTwenty,
                label: t(`wishlist.priceRange.${PRICE_RANGE.UpToTwenty}`),
            },
            {
                value: PRICE_RANGE.UpToFifty,
                label: t(`wishlist.priceRange.${PRICE_RANGE.UpToFifty}`),
            },
            // { value: PRICE_RANGE.AboveFifty, label: t(`wishlist.priceRange.${PRICE_RANGE.AboveFifty}`) },
        ];
    }

    getItemsGiftFor() {
        return [
            { value: GIFT_FOR.LieneAndKristof, label: 'Liene und Kristof' },
            { value: GIFT_FOR.Liene, label: 'Liene' },
            { value: GIFT_FOR.Kristof, label: 'Kristof' },
        ];
    }
}

export const ServiceWishlist = new ServiceWishlistClass();
