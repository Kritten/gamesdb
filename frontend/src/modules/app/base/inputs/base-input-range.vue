<template>
  <div class="row">
    <div class="col-shrink q-mr-md">
      {{ baseInput.label.value }}
    </div>
    <div class="col">
      <q-range
        v-model="modelValueInternal"
        v-bind="optionsMerged"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
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

    const modelValueInternal = computed<{min: number, max: number}>({
      get: () => {
        if (Array.isArray(props.modelValue)) {
          return {
            min: props.modelValue[0] as number,
            max: props.modelValue[1] as number,
          };
        }
        return {
          min: 0,
          max: 100,
        };
      },
      set(value) {
        emit('update:modelValue', [value.min, value.max]);
      },
    });

    return {
      modelValueInternal,
      baseInput,
      optionsMerged: computed(() => {
        const result = {
          ...configBaseInput,
          ...props.options,
        };

        // @ts-ignore Spezialfall für QRange
        result.label = true;

        return result;
      }),
    };
  },
});
</script>

<style scoped>

</style>
