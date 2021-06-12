<template>
  <base-dialog
    :title="`${t('player.label')} ${t('common.delete')}`"
    :text-submit="t('common.delete')"
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
        <q-tooltip class="text-capitalize">
          {{ t('common.delete') }}
        </q-tooltip>
      </q-btn>
    </template>

    {{ t('player.confirm.delete', {name: player.name}) }}
  </base-dialog>
</template>

<script lang="ts">
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';
import { Player } from '@/modules/player/player.model';
import { defineComponent } from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';

export default defineComponent({
  // TODO: Migrate to <base-entity-delete>
  name: 'DeletePlayer',
  components: { BaseDialog },
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const deletePlayer = ServicePlayer.useDelete();

    return {
      t,
      deletePlayer,
      async submit(close: () => void) {
        await deletePlayer.delete(props.player);
        close();
      },
    };
  },
});
</script>

<style scoped>

</style>
