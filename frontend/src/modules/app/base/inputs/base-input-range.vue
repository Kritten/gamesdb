<template>
  <el-form-item :label="optionsMerged.label">
    <el-slider
      v-model="modelValueInternal"
      v-bind="optionsMerged"
      range
    />
  </el-form-item>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue';
import { getValidator, useModelWrapper } from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseInputRange',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({
        number: true, string: true, undefined: true, array: true,
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
    // interface FooEmit {
    //   <E extends string>(func: (event: E, ...args: any[]) => void): void,
    //   (func: (event: string, ...args: any[]) => void): void
    // }
    //
    // const foo: FooEmit = (emitter: (event: string, ...args: any[]) => void) => emitter('sttr');
    // // type emitType<E extends string> = (event: E, ...args: unknown[]) => void;
    // // const foo = <E extends string>(func: emitType<E>) => { func('update:name'); };
    // //
    // // foo(emit);
    // // setup(props, { emit }) {

    const baseInput = useBaseInput<
      string | null,
      string | number | null
      >(
        props,
        emit,
      );

    return {
      modelValueInternal: useModelWrapper({
        // @ts-ignore
        props,
        emit,
        name: 'modelValue',
      }),
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
