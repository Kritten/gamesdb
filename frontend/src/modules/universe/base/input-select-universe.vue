<template>
  <base-input-select
    v-model="universeInternal"
    :options="optionsMerged"
    :validation="validation"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { Universe } from '@/modules/universe/universe.model';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';

export default defineComponent({
  name: 'InputSelectUniverse',
  components: { BaseInputSelect },
  props: {
    modelValue: {
      required: false,
      type: [Object, Array] as PropType<Universe | Array<Universe>>,
      default: undefined,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    options: {
      required: false,
      type: Object as PropType<Partial<TypeOptionsInput>>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const { universes } = useUniverse();

    return {
      t,
      optionsMerged: computed(() => ({
        label: t('universe.label', Array.isArray(props.modelValue) ? 2 : 1),
        items: universes.value,
        useInput: true,
        optionValue: 'id',
        optionLabel: 'name',
        clearable: true,
        ...props.options,
      })),
      universeInternal: useModelWrapper({ props, emit }),
    };
  },
});
</script>

<style scoped>

</style>
