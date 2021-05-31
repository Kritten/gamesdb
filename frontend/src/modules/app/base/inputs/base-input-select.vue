<template>
  <q-select
    ref="qSelect"
    :model-value="modelValue"
    :options="optionsMerged.items"
    v-bind="optionsMerged"
    @update:model-value="baseInput.input"

    @virtual-scroll="onScroll"
    @filter="filter"
  />
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';
import { QSelect } from 'quasar';

export default defineComponent({
  name: 'BaseInputSelect',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({
        number: true, string: true, boolean: true, null: true, undefined: true, object: true,
      }),
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    options: {
      required: false,
      type: Object,
      default: () => ({}),
    },
    onScroll: {
      required: false,
      type: Function,
      default: () => true,
    },
    filter: {
      required: false,
      type: Function,
      default: () => true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const qSelect = ref<QSelect | null>(null);

    const baseInput = useBaseInput<
      string,
      string
      >(
        props,
        emit,
        (value) => value,
      );

    return {
      baseInput,
      qSelect,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
      refresh() {
        if (qSelect.value !== null) {
          qSelect.value.refresh();
        }
      },
    };
  },
});
</script>

<style scoped>

</style>
