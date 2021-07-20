<template>
  <div class="row full-height">
    <div class="col full-height">
      <q-card class="column full-height">
        <q-card-section>
          <div class="text-h6">
            {{ wishlistItem.name }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-carousel
            v-model="slide"
            height="15rem"
            animated
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              v-for="(image, index) in wishlistItem.images"
              :key="index"
              :name="index"
            >
              <q-img
                :src="image"
                fit="contain"
                height="14rem"
              />
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>

        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-6 text-bold">
              {{ t('wishlist.giftFor') }}
            </div>
            <div class="col-6">
              <display-gift-for :value="wishlistItem.giftFor" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-6 text-bold">
              {{ t('wishlist.price') }}
            </div>
            <div class="col-6">
              <display-price-range :value="wishlistItem.price" />
            </div>
          </div>
        </q-card-section>

        <q-card-section class="col-grow">
          <div v-html="wishlistItem.description" />
        </q-card-section>

        <q-card-actions>
          <q-btn
            type="a"
            :href="wishlistItem.link"
            flat
            icon="fas fa-search"
            :label="t('wishlist.buy')"
          />

          <q-space />

          <base-dialog
            v-if="wishlistItem.taken"
            :text-submit="t('common.confirm')"
            @submit="giveBack"
          >
            <template #activator="{ open }">
              <q-btn
                flat
                icon="fas fa-cancel"
                :label="t('wishlist.giveBack')"
                @click="open"
              />
            </template>

            {{ t('wishlist.confirm.giveBack') }}
          </base-dialog>

          <base-dialog
            v-else
            :text-submit="t('common.confirm')"
            @submit="take"
          >
            <template #activator="{ open }">
              <q-btn
                flat
                icon="fas fa-gift"
                color="primary"
                :label="t('wishlist.take')"
                @click="open"
              />
            </template>

            {{ t('wishlist.confirm.take') }}
          </base-dialog>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, Ref,
} from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import DisplayGiftFor from '@/modules/wishlist/display/display-gift-for.vue';
import { useI18n } from 'vue-i18n';
import DisplayPriceRange from '@/modules/wishlist/display/display-price-range.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import BaseLink from '@/modules/app/base/base-link.vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';

export default defineComponent({
  name: 'ListWishlistItemExtern',
  components: {
    BaseDialog, BaseLink, DisplayPriceRange, DisplayGiftFor,
  },
  props: {
    wishlistItem: {
      required: true,
      type: Object as PropType<Wishlist>,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const autoplay = ref(true);
    const slide = ref(0);

    return {
      t,
      autoplay,
      slide,
      giveBack() {
        const wishlistItemEdited = props.wishlistItem;
        wishlistItemEdited.taken = false;
        ServiceWishlist.updateTaken(wishlistItemEdited);
      },
      take() {
        const wishlistItemEdited = props.wishlistItem;
        wishlistItemEdited.taken = true;
        ServiceWishlist.updateTaken(wishlistItemEdited);
      },
    };
  },
});
</script>

<style scoped></style>
