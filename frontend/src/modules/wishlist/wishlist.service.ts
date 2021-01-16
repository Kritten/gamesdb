import { computed, ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { cloneDeep } from 'lodash';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';
import { queue } from '@/queue';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import {
  mutationCreateWishlist,
  mutationDeleteWishlist,
  mutationUpdateWishlist,
  queryPageWishlist,
  queryWishlistItem,
} from '@/modules/wishlist/graphql/wishlist.graphql';
import { ID, ServiceEntityInterface } from '../app/utilities/entity/entity.types';
import { ServiceCollectionInterface } from '../app/utilities/collection/collection.types';
import { store } from '@/modules/app/app.store';

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
    const response = await apolloClient.mutate({
      mutation: mutationCreateWishlist,
      variables: {
        wishlist: wishlist.prepareForServer(),
      },
    });

    const wishlistNew = await Wishlist.parseFromServer(response.data.createWishlist);

    queue.notify('createdWishlist', wishlistNew);

    return wishlistNew;
  }

  async update(wishlist: Wishlist) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateWishlist,
      variables: {
        wishlist: wishlist.prepareForServer(),
      },
    });

    const wishlistNew = await Wishlist.parseFromServer(response.data.updateWishlist);

    store.commit('moduleWishlist/addWishlistItem', wishlistNew);

    queue.notify('updatedWishlist', wishlistNew);

    return wishlistNew;
  }

  async delete(wishlist: Wishlist) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteWishlist,
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
      const response = await apolloClient.query({
        query: queryWishlistItem,
        variables: {
          id,
        },
      });

      wishlistItem = await Wishlist.parseFromServer(response.data.wishlist);

      store.commit('moduleWishlist/addWishlistItem', wishlistItem);
    }

    return wishlistItem;
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<Wishlist>({
      data,
      query: queryPageWishlist,
      parseResult: async response => ({
        items: await Promise.all(
          response.data.wishlists.items.map((wishlist: Wishlist) =>
            Wishlist.parseFromServer(wishlist),
          ),
        ),
        count: response.data.wishlists.count,
      }),
    });
  }

  getGiftFor() {
    return {
      LieneAndKristof: 0,
      Liene: 1,
      Kristof: 2,
    };
  }

  getItemsGiftFor() {
    const giftsFor = this.getGiftFor();
    return [
      { key: giftsFor.LieneAndKristof, text: 'Liene und Kristof' },
      { key: giftsFor.Liene, text: 'Liene' },
      { key: giftsFor.Kristof, text: 'Kristof' },
    ];
  }
}

export const ServiceWishlist = new ServiceWishlistClass();
