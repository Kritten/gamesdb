<template>
  <base-input-select-entity
    v-model="mechanismInternal"
    :validation="validation"
    :items="mechanisms"
    i18n-prefix="mechanism"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';
import BaseInputSelectEntity from '@/modules/app/base/inputs/base-input-select-entity.vue';
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { Mechanism } from '@/modules/mechanism/mechanism.model';

export default defineComponent({
  name: 'InputSelectMechanism',
  components: { BaseInputSelectEntity },
  props: {
    modelValue: {
      required: false,
      type: [Object, Array] as PropType<Mechanism | Array<Mechanism>>,
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
    const { mechanisms } = useMechanism();

    return {
      mechanisms,
      mechanismInternal: useModelWrapper({ props, emit }),
    };
  },
});
</script>

<style scoped>

</style>
