<template>
  <base-dialog
    :title="`${t(`${i18nPrefix}.label`)} ${t('common.delete')}`"
    :text-submit="t('common.edit')"
    :options-button-submit="{
      color: 'negative',
    }"
    @submit="submit"
  >
    <template #activator="{ open }">
      <q-btn
        icon="fas fa-trash"
        color="negative"
        flat
        size="sm"
        round
        @click="open"
      >
        <q-tooltip>
          {{ t(`${i18nPrefix}.label`) }} {{ t('common.delete') }}
        </q-tooltip>
      </q-btn>
    </template>

    {{ t(`${i18nPrefix}.confirm.delete`, {name: entity.name}) }}
  </base-dialog>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import { useI18n } from 'vue-i18n';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export default defineComponent({
  name: 'BaseEntityDelete',
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
    service: {
      required: true,
      type: Object as PropType<{useDelete(): {
          delete(entity: Entity): Promise<boolean>;
      }}>,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const deletePlayer = props.service.useDelete();

    return {
      t,
      async submit(close: () => void) {
        await deletePlayer.delete(props.entity);
        close();
        emit('submit', close);
      },
    };
  },
});
</script>

<style scoped>

</style>
