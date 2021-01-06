<template>
  <div>
    <label for="name">{{ t('wishlist.name') }}</label>
    <input
      id="name"
      v-model="nameInternal"
    >
  </div>
  <div>
    <label for="price">{{ t('wishlist.price') }}</label>
    <input
      id="price"
      v-model.number="priceInternal"
      type="number"
    >
  </div>
  <div>
    <label for="taken">{{ t('wishlist.taken') }}</label>
    <input
      id="taken"
      v-model="takenInternal"
      type="checkbox"
    >
  </div>
  <div>
    <label for="link">{{ t('wishlist.link') }}</label>
    <input
      id="link"
      v-model="linkInternal"
    >
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useCollection } from '../app/utilities/collection/collection';
import {useModelWrapper} from "@/modules/app/utilities/helpers";

export default defineComponent({
  name: 'ItemWishlist',
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    taken: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();

    const filtersWishlist = ref<ServiceCollectionFilters>({
      name: {
        field: 'name', valueString: undefined, operator: 'like',
      },
    });
    const collectionGame = useCollection<Wishlist>(
      ServiceWishlist.loadPage,
      { inputCollectionData: { count: 5, filters: filtersWishlist } },
    );

    return {
      t,
      store,
      collectionGame,
      nameInternal: useModelWrapper({
        props, emit, name: 'name',
      }),
      priceInternal: useModelWrapper({
        props, emit, name: 'price',
      }),
      takenInternal: useModelWrapper({
        props, emit, name: 'taken',
      }),
      linkInternal: useModelWrapper({
        props, emit, name: 'link',
      }),
    };
  },
});
</script>

<style scoped>

</style>
