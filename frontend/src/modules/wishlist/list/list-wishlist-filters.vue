<template>
  <button
    type="button"
    @click="$emit('reset')"
  >
    Reset
  </button>
  <div>
    <base-list-filter
      :filters="filters"
      label="wishlist.filters.name"
      name="entity.name"
      type="string"
      @update-filter="$emit('update-filter', $event)"
    />
    <base-list-filter
      :filters="filters"
      :items="itemsGiftFor"
      label="wishlist.filters.giftFor"
      name="entity.giftFor"
      type="select"
      @update-filter="$emit('update-filter', $event)"
    />
    <base-list-filter
      :filters="filters"
      :items="itemsPriceRange"
      label="wishlist.filters.price"
      name="entity.price"
      type="select"
      operator="<="
      @update-filter="$emit('update-filter', $event)"
    />
    <base-list-filter
      :filters="filters"
      label="wishlist.filters.taken"
      name="entity.taken"
      type="boolean"
      @update-filter="$emit('update-filter', $event)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ListWishlistFilters',
  components: { BaseListFilter },
  props: {
    modelValue: {
      required: true,
      type: Object,
    },
  },
  emits: ['reset', 'update-filter'],
  setup(props) {
    const { t } = useI18n();

    return {
      i18nPrefix: 'game',
      filters: computed(() => props.modelValue),
      itemsGiftFor: [{ key: undefined, text: t('common.undefined') }, ...ServiceWishlist.getItemsGiftFor()],
      itemsPriceRange: [{ key: undefined, text: t('common.undefined') }, ...ServiceWishlist.getItemsPriceRange()],
    };
  },
});
</script>

<style scoped />
