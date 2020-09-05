<template>
  <slot>
    <input
      v-model="value"
    >
  </slot>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, nextTick, computed,
} from 'vue';

export default defineComponent({
  name: 'BaseListFilter',
  props: {
    filters: {
      required: true,
      type: Object,
    },
    name: {
      required: true,
      type: String,
    },
  },
  emits: ['update-filter'],
  setup(props, { emit }) {
    const emitValue = (valueNew: unknown) => {
      emit('update-filter', {
        name: props.name,
        filter: {
          field: 'name',
          valueString: valueNew,
          operator: 'like',
        },
      });
    };

    const value = computed({
      get() {
        const filter = props.filters[props.name];
        return filter === undefined ? '' : filter.valueString;
      },
      set(valueNew) {
        emitValue(valueNew);
      },
    });
    /**
     * Execute everytime the current filter changes to check if it has to be initialized
     */
    watch(() => props.filters[props.name], () => {
      if (props.filters[props.name] === undefined) {
        nextTick(() => {
          emitValue(undefined);
        });
      }
    }, { deep: true, immediate: true });

    return { value };
  },
});
</script>

<style scoped>

</style>
