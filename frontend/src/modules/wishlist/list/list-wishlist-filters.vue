<template>
  <el-row>
    <el-col :span="12">
      <h3>{{ t('filter.label') }}</h3>
    </el-col>
    <el-col
      :span="12"
      class="filter-reset"
    >
      <div>
        <el-button
          type="text"
          @click="$emit('reset')"
        >
          {{ t('filter.reset') }}
        </el-button>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form v-bind="state.optionsForm">
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
          label="wishlist.filters.price"
          name="entity.price"
          type="range"
          @update-filter="$emit('update-filter', $event)"
          :options="{
            marks: {
              0: '0€',
              100: 'unbegrenzt',
            },
            'format-tooltip': (value) => {
              if (value === 100) {
                return 'unbegrenzt';
              }

              return `${value}€`
            },
          }"
        />
        <base-list-filter
          :filters="filters"
          label="wishlist.filters.taken"
          name="entity.taken"
          type="boolean"
          @update-filter="$emit('update-filter', $event)"
        />
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

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
    const { state } = useStore();

    return {
      t,
      state,
      i18nPrefix: 'game',
      filters: computed(() => props.modelValue),
      itemsGiftFor: [{ key: -1, text: t('common.undefined') }, ...ServiceWishlist.getItemsGiftFor()],
    };
  },
});
</script>

<style scoped lang="scss">
.filter-reset {
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    text-align: right;
  }
}
</style>
