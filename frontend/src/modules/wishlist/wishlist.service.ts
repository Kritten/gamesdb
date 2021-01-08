import { ref } from 'vue';
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
} from '@/modules/wishlist/graphql/wishlist.graphql';
import { ServiceEntityInterface } from '../app/utilities/entity/entity.types';
import { ServiceCollectionInterface } from '../app/utilities/collection/collection.types';

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
}

export const ServiceWishlist = new ServiceWishlistClass();