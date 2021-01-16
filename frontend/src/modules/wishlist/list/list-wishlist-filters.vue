<template>
  <button
    type="button"
    @click="$emit('reset')"
  >
    Reset
  </button>
  <div>
<!--    <base-list-filter-->
<!--      :filters="filters"-->
<!--      label="game.filters.name"-->
<!--      name="game.name"-->
<!--      type="string"-->
<!--      @update-filter="$emit('update-filter', $event)"-->
<!--    />-->
<!--    <base-list-filter-->
<!--      :filters="filters"-->
<!--      label="player.filters.name"-->
<!--      name="player.name"-->
<!--      type="string"-->
<!--      @update-filter="$emit('update-filter', $event)"-->
<!--    />-->
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';

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
    return {
      i18nPrefix: 'game',
      filters: computed(() => props.modelValue),
    };
  },
});
</script>

<style scoped />
