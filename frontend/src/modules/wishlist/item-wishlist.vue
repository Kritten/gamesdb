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
        label: t('wishlist.price')
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
      v-model="descriptionInternal"
      :options="{
        label: t('wishlist.description'),
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
  <div>
    <base-input-select
      v-model="giftForInternal"
      :options="{
        label: t('wishlist.giftFor'),
        items: itemsGiftFor,
      }"
    />
  </div>
  <div>
    <base-input-images
      v-model="imagesInternal"
    />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { toNumber, useModelWrapper } from '@/modules/app/utilities/helpers';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import BaseInputImages from '@/modules/app/base/inputs/base-input-images.vue';
import { Image } from '@/modules/image/image.model';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';
import { useCollection } from '../app/utilities/collection/collection';

export default defineComponent({
  name: 'ItemWishlist',
  components: {
    BaseInputNumber,
    BaseInputImages,
    BaseInputSelect,
    BaseInputBoolean,
    BaseInputText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
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
      type: Array as PropType<Array<Image>>,
      required: true,
    },
    hideTaken: {
      type: Boolean,
      required: false,
      default: false,
    },
    giftFor: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:name', 'update:price', 'update:taken', 'update:link', 'update:giftFor', 'update:images'],
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
      nameInternal: useModelWrapper<string>({
        props, emit, name: 'name',
      }),
      priceInternal: useModelWrapper<number>({
        props, emit, name: 'price', parse: (value) => toNumber(value as string),
      }),
      takenInternal: useModelWrapper<boolean>({
        props, emit, name: 'taken',
      }),
      descriptionInternal: useModelWrapper<string>({
        props, emit, name: 'description',
      }),
      linkInternal: useModelWrapper<string>({
        props, emit, name: 'link',
      }),
      imagesInternal: useModelWrapper({
        props, emit, name: 'images',
      }),
      giftForInternal: useModelWrapper({
        props, emit, name: 'giftFor', parse: (value) => toNumber(value as string),
      }),
      itemsGiftFor: ServiceWishlist.getItemsGiftFor(),
      itemsPriceRange: ServiceWishlist.getItemsPriceRange(),
    };
  },
});
</script>

<style scoped>

</style>
