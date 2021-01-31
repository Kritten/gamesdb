<template>
  <el-form-item :label="optionsMerged.label">
    <el-select
      :model-value="modelValue"
      @change="baseInput.input"
    >
      <el-option
        v-for="(option, index) in optionsMerged.items"
        :key="index"
        :value="option.key"
        :label="option.text"
      >
        {{ option.text }}
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseInputSelect',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({
        number: true, string: true, boolean: true, null: true, undefined: true,
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
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
    };
  },
});
</script>

<style scoped>

</style>
