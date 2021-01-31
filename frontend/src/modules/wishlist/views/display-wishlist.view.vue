<template>
  <el-container>
    <el-main>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :md="12">
          <h1>{{ t('wishlist.label') }}</h1>
          <list-wishlist :filters="filters">
            <template #items="{ wishlistItems }">
              <el-row
                :gutter="20"
                type="flex"
                class="list-wishlist"
              >
                <template
                  v-for="wishlistItem in wishlistItems"
                  :key="wishlistItem.id"
                >
                  <list-wishlist-item-extern :wishlist-item="wishlistItem" />
                </template>
              </el-row>
            </template>
          </list-wishlist>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';
import ListWishlistItemExtern from '@/modules/wishlist/list/list-wishlist-item-extern.vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
  name: 'ViewDisplayWishlist',
  components: { ListWishlistItemExtern, ListWishlist },
  setup() {
    const { t } = useI18n();
    return {
      t,
      filters(filters: ServiceCollectionFilters): ServiceCollectionFilters {
        return {
          ...filters,
          'entity.taken': {
            field: 'entity.taken',
            valueBoolean: false,
            operator: '=',
          },
        };
      },
    };
  },
});
</script>

<style scoped></style>
