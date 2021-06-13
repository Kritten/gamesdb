<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-input-text
        v-model="nameInternal"
        :validation="validation?.name"
        :options="{
          label: t('mood.name'),
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { defineComponent, PropType } from 'vue';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'ItemMood',
  components: {
    BaseInputText,
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    return {
      t,
      nameInternal: useModelWrapper<string>({
        props, emit, name: 'name',
      }),
    };
  },
});
</script>

<style scoped>
  tfoot tr td {
    border-top-width: 3px;
  }

  .error-playtimes {
    font-size: 11px;
  }
</style>
