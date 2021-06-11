<template>
  <q-toggle
    v-if="canBeUndefined === false"
    :model-value="modelValue"
    v-bind="optionsMerged"
    @update:model-value="baseInput.input"
  />
  <template v-else>
    <div class="row items-center">
      <div class="col-shrink">
        {{ optionsMerged.label }}:
      </div>
      <div class="col">
        <q-option-group
          inline
          :model-value="modelValue"
          :options="[
            {
              label: t('common.yes'),
              value: true,
            },
            {
              label: t('common.no'),
              value: false,
            },
            {
              label: t('common.undefined'),
              value: undefined,
            },
          ]"
          @update:model-value="baseInput.input"
        />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getValidator, useId, useModelWrapper,
} from '@/modules/app/utilities/helpers';
import { configBaseInput, TypeOptionsInput, useBaseInput } from '@/modules/app/base/inputs/base-input';

export default defineComponent({
  name: 'BaseInputBoolean',
  props: {
    modelValue: {
      required: true,
      validator: getValidator({ boolean: true, undefined: true, number: true }),
    },
    canBeUndefined: {
      required: false,
      type: Boolean,
      default: false,
    },
    options: {
      required: false,
      type: Object as PropType<TypeOptionsInput>,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const baseInput = useBaseInput<
      boolean | number | undefined,
      boolean | number | undefined
      >(
        props,
        emit,
        // (value) => typeof value === 'number' ? undefined : value,
      );

    return {
      t,
      modelValueInternal: useModelWrapper<boolean>({
        // @ts-ignore
        props, emit, name: 'modelValue',
      }),
      baseInput,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
      name: useId().generate(),
    };
  },
});
</script>

<style scoped lang="scss">
</style>
