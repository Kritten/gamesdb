<template>
  <!--  <base-input-text-->
  <!--    :model-value="modelValue"-->
  <!--    :validation="validation"-->
  <!--    :options="optionsMerged"-->
  <!--    @update:model-value="$emit('update:modelValue', $event)"-->
  <!--  />-->
  <el-form-item :label="optionsMerged.label">
    <el-input-number
      :model-value="modelValue"
      @input="baseInput.input"
    />
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
import { Validation } from '@vuelidate/core';
import { useBaseInput } from '@/modules/app/base/inputs/base-input';

export default defineComponent({
  name: 'BaseInputNumber',
  components: { },
  props: {
    modelValue: {
      required: true,
      validator: getValidator({
        number: true, string: true, null: true, undefined: true,
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
      string | null,
      string | number | null
      >(
        props,
        emit,
      );
    return {
      baseInput,
      optionsMerged: computed(() => ({
        ...props.options,
        // type: 'number',
      })),
    };
  },
});
</script>

<style scoped>

</style>
