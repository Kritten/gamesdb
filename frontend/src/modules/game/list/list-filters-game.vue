<template>
  <button
    type="button"
    @click="$emit('reset')"
  >
    Reset
  </button>
  <base-list-filter
    :filters="filters"
    name="name"
    @update-filter="$emit('update-filter', $event)"
  />
  <base-list-filter
    :filters="filters"
    name="foo"
    @update-filter="$emit('update-filter', $event)"
  />
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
      filters: computed(() => props.modelValue),
    };
  },
});
</script>

<style scoped />
