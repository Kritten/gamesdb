<template>
  <base-dialog
    :title="`${t(`${i18nPrefix}.label`)} ${t('common.edit')}`"
    :text-submit="t('common.edit')"
    :options-button="{
      label: `${t(`${i18nPrefix}.label`)} ${t('common.edit')}`,
    }"
    :validation="validation"
    @submit="submit"
  >
    <template #activator="{ open }">
      <q-btn
        icon="fas fa-edit"
        color="primary"
        flat
        size="sm"
        round
        @click="open"
      >
        <q-tooltip>
          {{ t(`${i18nPrefix}.label`) }} {{ t('common.edit') }}
        </q-tooltip>
      </q-btn>
    </template>

    <slot
      name="item"
      :entity="updateEntity.entity"
      :validation="validation"
    />
  </base-dialog>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export default defineComponent({
  name: 'BaseEntityUpdate',
  components: { BaseDialog },
  props: {
    i18nPrefix: {
      required: true,
      type: String,
    },
    entity: {
      required: true,
      type: Object as PropType<Entity>,
    },
    useUpdateEntity: {
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

    const updateEntity = props.useUpdateEntity(props.entity);

    const validation = useVuelidate(computed(() => (props.validationRules)), updateEntity.entity, { $stopPropagation: true });

    return {
      t,
      validation,
      updateEntity,
      async submit(close: () => void) {
        await updateEntity.update();
        close();
        emit('submit', close);
      },
    };
  },
});
</script>

<style scoped>

</style>
