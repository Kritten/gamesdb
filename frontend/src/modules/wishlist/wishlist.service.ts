import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { cloneDeep } from 'lodash';
import { queue } from '@/queue';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import {
  mutationCreateWishlist,
  mutationDeleteWishlist,
  mutationUpdateWishlist,
  mutationUpdateWishlistTaken,
  queryPageWishlist,
  queryWishlistItem,
} from '@/modules/wishlist/graphql/wishlist.graphql';
import { GIFT_FOR, PRICE_RANGE } from '@/modules/wishlist/wishlist.constants';
import { useI18n } from 'vue-i18n';
import {
  InputCollection,
  ServiceCollectionInterface, ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import { query } from '@/modules/app/utilities/helpers';
import { WishlistInterface } from '@/modules/wishlist/wishlist.types';
import { ID, ServiceEntityInterface } from '../app/utilities/entity/entity.types';

class ServiceWishlistClass
implements ServiceCollectionInterface<Wishlist>, ServiceEntityInterface<Wishlist> {
  useCreate() {
    const wishlist = ref(new Wishlist());

    return {
      entity: wishlist,
      create: async () => {
        const wishlistNew = await this.create(wishlist.value);
        wishlist.value = new Wishlist();
        return wishlistNew;
      },
    };
  }

  useUpdate(wishlistPassed: Wishlist) {
    const wishlist = ref(cloneDeep(wishlistPassed));

    return {
      entity: wishlist,
      update: async () => {
        wishlist.value = cloneDeep(await this.update(wishlist.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (wishlist: Wishlist) => this.delete(wishlist),
    };
  }

  async create(wishlist: Wishlist) {
    const { mutate } = useMutation(mutationCreateWishlist);
    const response = await mutate({
      variables: {
        wishlist: wishlist.prepareForServer(),
      },
    });

    const wishlistNew = await Wishlist.parseFromServer(response.data.createWishlist);

    queue.notify('createdWishlist', wishlistNew);

    return wishlistNew;
  }

  async update(wishlist: Wishlist) {
    const { mutate } = useMutation(mutationUpdateWishlist);
    const response = await mutate({
      variables: {
        wishlist: wishlist.prepareForServer(),
      },
    });

    const wishlistNew = await Wishlist.parseFromServer(response.data.updateWishlist);

    // TODO
    // store.commit('moduleWishlist/addWishlistItem', wishlistNew);

    queue.notify('updatedWishlist', wishlistNew);

    return wishlistNew;
  }

  async updateTaken(wishlist: Wishlist) {
    const { mutate } = useMutation(mutationUpdateWishlistTaken);
    const response = await mutate({
      variables: {
        wishlist: wishlist.prepareForServer(),
      },
    });

    const wishlistNew = await Wishlist.parseFromServer(response.data.updateWishlist);

    // TODO
    // store.commit('moduleWishlist/addWishlistItem', wishlistNew);

    queue.notify('updatedWishlist', wishlistNew);

    return wishlistNew;
  }

  async delete(wishlist: Wishlist) {
    const { mutate } = useMutation(mutationDeleteWishlist);
    const response = await mutate({
      variables: {
        id: wishlist.id,
      },
    });

    queue.notify('deletedWishlist', wishlist);

    return response.data.deleteWishlist;
  }

  async getOrLoad(id: ID) {
    // @ts-ignore
    let wishlistItem: Wishlist = store.state.moduleWishlist.wishlistItems[id];

    if (wishlistItem === undefined) {
      const response = await query<{wishlist: WishlistInterface}>(queryWishlistItem, {
        id,
      });

      wishlistItem = await Wishlist.parseFromServer(response.wishlist);

      // TODO
      // store.commit('moduleWishlist/addWishlistItem', wishlistItem);
    }

    return wishlistItem;
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<Wishlist, {wishlists: ServiceCollectionLoadPage<Wishlist>}>({
      data,
      query: queryPageWishlist,
      parseResult: async (response) => ({
        items: await Promise.all(
          response.wishlists.items.map((wishlist: Wishlist) => Wishlist.parseFromServer(wishlist)),
        ),
        count: response.wishlists.count,
      }),
    });
  }

  getItemsPriceRange() {
    const { t } = useI18n();
    return [
      { key: PRICE_RANGE.UpToTen, text: t(`wishlist.priceRange.${PRICE_RANGE.UpToTen}`) },
      { key: PRICE_RANGE.UpToTwenty, text: t(`wishlist.priceRange.${PRICE_RANGE.UpToTwenty}`) },
      { key: PRICE_RANGE.UpToFifty, text: t(`wishlist.priceRange.${PRICE_RANGE.UpToFifty}`) },
      // { key: PRICE_RANGE.AboveFifty, text: t(`wishlist.priceRange.${PRICE_RANGE.AboveFifty}`) },
    ];
  }

  getItemsGiftFor() {
    return [
      { key: GIFT_FOR.LieneAndKristof, text: 'Liene und Kristof' },
      { key: GIFT_FOR.Liene, text: 'Liene' },
      { key: GIFT_FOR.Kristof, text: 'Kristof' },
    ];
  }
}

export const ServiceWishlist = new ServiceWishlistClass();
