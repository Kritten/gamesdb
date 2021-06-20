<template>
  <base-input-select-entity
    v-model="moodsInternal"
    :validation="validation"
    :items="moods"
    i18n-prefix="mood"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';
import BaseInputSelectEntity from '@/modules/app/base/inputs/base-input-select-entity.vue';
import { Mood } from '@/modules/mood/mood.model';
import { useMood } from '@/modules/mood/composables/useMood';

export default defineComponent({
  name: 'InputSelectMood',
  components: { BaseInputSelectEntity },
  props: {
    modelValue: {
      required: false,
      type: [Object, Array] as PropType<Mood | Array<Mood>>,
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
    const { moods } = useMood();

    return {
      moods,
      moodsInternal: useModelWrapper({ props, emit }),
    };
  },
});
</script>

<style scoped>

</style>
