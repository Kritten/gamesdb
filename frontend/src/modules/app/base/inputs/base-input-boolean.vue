<template>
  <el-form-item :label="optionsMerged.label">
    <el-radio-group
      class="inputs"
      :model-value="modelValue"
      @change="baseInput.input"
    >
      <el-radio :label="true">
        {{ t('common.yes') }}
      </el-radio>
      <el-radio :label="false">
        {{ t('common.no') }}
      </el-radio>
      <el-radio
        v-if="canBeUndefined === true"
        :label="-1"
      >
        {{ t('common.undefined') }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getValidator, toNumber, useId, useModelWrapper,
} from '@/modules/app/utilities/helpers';
import { configBaseInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

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
      modelValueInternal: useModelWrapper({
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
