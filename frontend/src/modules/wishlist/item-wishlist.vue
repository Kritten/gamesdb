<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-input-text
        v-model="nameInternal"
        :validation="validation?.name"
        :options="{
          label: t('wishlist.name'),
        }"
      />
    </div>

    <div class="col-12">
      <base-input-amount
        v-model="priceInternal"
        :validation="validation?.price"
        :options="{
          label: t('wishlist.price')
        }"
      />
    </div>

    <div
      v-if="hideTaken === false"
      class="col-12"
    >
      <base-input-boolean
        v-model="takenInternal"
        :validation="validation?.taken"
        :options="{
          label: t('wishlist.taken'),
        }"
      />
    </div>

    <div class="col-12">
      <base-input-text
        v-model="descriptionInternal"
        :validation="validation?.description"
        :options="{
          label: t('wishlist.description'),
        }"
      />
    </div>

    <div class="col-12">
      <base-input-text
        v-model="linkInternal"
        :validation="validation?.link"
        :options="{
          label: t('wishlist.link'),
        }"
      />
    </div>

    <div class="col-12">
      <base-input-select
        v-model="giftForInternal"
        :validation="validation?.giftFor"
        :options="{
          label: t('wishlist.giftFor'),
          items: itemsGiftFor,
          mapOptions: true,
          emitValue: true
        }"
      />
    </div>

    <div class="col-12">
      <base-input-images
        v-model="imagesInternal"
        :validation="validation?.images"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, PropType, ref } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import { toNumber, useModelWrapper } from '@/modules/app/utilities/helpers';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import BaseInputImages from '@/modules/app/base/inputs/base-input-images.vue';
import { Validation } from '@vuelidate/core';
import BaseInputAmount from '@/modules/app/base/inputs/base-input-amount.vue';
import { useCollection } from '../app/utilities/collection/collection';

export default defineComponent({
  name: 'ItemWishlist',
  components: {
    BaseInputAmount,
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
      type: Array as PropType<Array<string>>,
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
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  emits: ['update:name', 'update:price', 'update:taken', 'update:link', 'update:giftFor', 'update:images'],
  setup(props, { emit }) {
    const { t } = useI18n();

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
    };
  },
});
</script>

<style scoped>

</style>
