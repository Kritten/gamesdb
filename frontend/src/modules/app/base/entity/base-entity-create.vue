<template>
  <base-dialog
    :title="`${t(`${i18nPrefix}.label`)} ${t('common.create')}`"
    :text-submit="t('common.create')"
    :options-button="{
      label: `${t(`${i18nPrefix}.label`)} ${t('common.create')}`,
      color: 'primary',
      icon: 'fa fa-plus',
    }"
    :validation="validation"
    @submit="submit"
  >
    <slot
      name="item"
      :entity="createEntity.entity"
      :validation="validation"
    />
  </base-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
} from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import { useI18n } from 'vue-i18n';
import useVuelidate, { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseEntityCreate',
  components: { BaseDialog },
  props: {
    i18nPrefix: {
      required: true,
      type: String,
    },
    useCreateEntity: {
      required: true,
      type: Function,
    },
    validationRules: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const createEntity = props.useCreateEntity();

    const validation = useVuelidate(computed(() => (props.validationRules)), createEntity.entity, { $stopPropagation: true });

    return {
      t,
      validation,
      createEntity,
      async submit(close: () => void) {
        await createEntity.create();
        close();
        emit('submit', close);
      },
    };
  },
});
</script>

<style scoped>

</style>
