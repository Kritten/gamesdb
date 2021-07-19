<template>
  <template v-if="wishlistItem !== null">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <base-card
          :title="wishlistItem.name"
          opened
        >
          <template #actions>
            <update-wishlist-item
              :wishlist-item="wishlistItem"
              @updated="loadWishlistItem"
            />
          </template>

          <q-card-section>
            {{ wishlistItem.description }}
          </q-card-section>
        </base-card>
      </div>

      <!--      Todo: Create and include <display-images -->

      <div class="col-12">
        <q-card>
          <q-card-section>
            <q-list>
              <q-item
                v-for="(property, index) in properties"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>
                    <template v-if="property.value !== undefined">
                      {{ property.value }}
                    </template>
                    <template v-else>
                      <component
                        :is="property.component"
                        v-bind="property.props"
                      />
                    </template>
                  </q-item-label>
                  <q-item-label caption>
                    {{ property.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 ">
        <q-card>
          <q-card-section>
            <delete-wishlist-item :wishlist-item="wishlistItem" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, Ref, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import DeleteWishlistItem from '@/modules/wishlist/delete/delete-wishlist-item.vue';

import UpdateWishlistItem from '@/modules/wishlist/update/update-wishlist-item.vue';
import DisplayPriceRange from '@/modules/wishlist/display/display-price-range.vue';
import DisplayGiftFor from '@/modules/wishlist/display/display-gift-for.vue';
import BaseCard from '@/modules/app/base/base-card.vue';
import BaseLink from '@/modules/app/base/base-link.vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';

export default defineComponent({
  name: 'ViewWishlistItem',
  components: {
    BaseCard,
    UpdateWishlistItem,
    DeleteWishlistItem,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idWishlist = route.params.id as string;

    const wishlistItem = ref<Wishlist | null>(null);

    const loadWishlistItem = () => {
      ServiceWishlist.getOrLoad(idWishlist).then((value) => {
        wishlistItem.value = value;
      });
    };

    loadWishlistItem();

    const properties: Ref<Array<{
      label: string,
      value?: string,
      component?: unknown,
      props?: Record<string, unknown>,
    }>> = computed(() => {
      if (wishlistItem.value === null) {
        return [];
      }

      return [
        {
          label: t('wishlist.price'),
          component: DisplayPriceRange,
          props: {
            value: wishlistItem.value.price,
          },
        },
        {
          label: t('wishlist.giftFor'),
          component: DisplayGiftFor,
          props: {
            value: wishlistItem.value.giftFor,
          },
        },
        {
          label: t('wishlist.link'),
          component: BaseLink,
          props: {
            path: wishlistItem.value.link,
            options: {
              label: wishlistItem.value.link,
            },
          },
        },
      ];
    });

    return {
      t,
      wishlistItem,
      properties,
      loadWishlistItem,
    };
  },
});
</script>

<style scoped>

</style>
