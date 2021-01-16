<template>
  <div>
    <base-input-text
      v-model="nameInternal"
      :options="{
        label: t('wishlist.name'),
      }"
    />
  </div>
  <div>
    <base-input-number
      v-model="priceInternal"
      :options="{
        label: t('wishlist.price'),
      }"
    />
  </div>
  <div v-if="hideTaken === false">
    <base-input-boolean
      v-model="takenInternal"
      :options="{
        label: t('wishlist.taken'),
      }"
    />
  </div>
  <div>
    <base-input-text
      v-model="linkInternal"
      :options="{
        label: t('wishlist.link'),
      }"
    />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import { useCollection } from '../app/utilities/collection/collection';

export default defineComponent({
  name: 'ItemWishlist',
  components: { BaseInputBoolean, BaseInputNumber, BaseInputText },
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
    hideTaken: {
      type: Boolean,
      required: false,
      default: false,
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
