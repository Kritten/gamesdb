<template>
  <q-select
    ref="qSelect"
    :model-value="modelValue"
    :options="optionsMerged.items"
    v-bind="optionsMerged"
    @update:model-value="baseInput.input"

    @virtual-scroll="onScroll"
    @filter="filter"
  >
    <template
      v-if="Array.isArray(modelValue)"
      #option="{ itemProps, opt, selected, toggleOption }"
    >
      <q-item v-bind="itemProps">
        <q-item-section side>
          <q-checkbox
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ opt[options.optionLabel !== undefined ? options.optionLabel : 'label'] }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
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
        number: true, string: true, boolean: true, null: true, undefined: true, object: true, array: true,
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
      default: (value: string, update: () => void) => update(),
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
        multiple: Array.isArray(props.modelValue),
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
