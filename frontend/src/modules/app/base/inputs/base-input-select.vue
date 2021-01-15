<template>
  <label :for="idInput"> {{ optionsMerged.label }}</label>
  <select
    :id="idInput"
    :value="modelValue"
    @change="baseInput.input"
  >
    <option
      v-for="(option, index) in optionsMerged.items"
      :key="index"
      :value="option.key"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getValidator, useId } from '@/modules/app/utilities/helpers';
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
  setup(props, { emit }) {
    const baseInput = useBaseInput<
      string,
      string
      >(
        props,
        emit,
      // @ts-ignore
        (value) => value.target.value,
      );

    return {
      baseInput,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
      idInput: useId().generate(),
    };
  },
});
</script>

<style scoped>

</style>
