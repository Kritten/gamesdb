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
      :i18n-prefix="i18nPrefix"
      name="name"
      type="string"
      @update-filter="$emit('update-filter', $event)"
    />
    <base-list-filter
      :filters="filters"
      :i18n-prefix="i18nPrefix"
      name="isCoop"
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

export default defineComponent({
  name: 'ListFiltersGame',
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
