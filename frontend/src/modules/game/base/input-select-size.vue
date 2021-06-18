<template>
  <base-input-select
    v-model="sizeInternal"
    :validation="validation"
    :options="{
      label: t('game.size'),
      items: items,
      emitValue: true,
      mapOptions: true,
    }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';

export default defineComponent({
  name: 'InputSelectSize',
  components: { BaseInputSelect },
  props: {
    modelValue: {
      required: false,
      type: Number,
      default: undefined,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const items = [0, 1, 2].map(value => ({
      label: t(`game.sizeFormatted.${value}`),
      value,
    }));

    return {
      t,
      items,
      sizeInternal: useModelWrapper({ props, emit }),
    };
  },
});
</script>

<style scoped>

</style>
