<template>
  <base-dialog
    :title="`${t('player.label')} ${t('common.edit')}`"
    :text-submit="t('common.edit')"
    :validation="vuelidate"
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
          {{ t('player.label') }} {{ t('common.edit') }}
        </q-tooltip>
      </q-btn>
    </template>

    <item-player
      v-model:name="updatePlayer.entity.value.name"
      :validation="vuelidate"
    />
  </base-dialog>
</template>

<script lang="ts">
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';
import { Player } from '@/modules/player/player.model';
import { computed, defineComponent } from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import ItemPlayer from '@/modules/player/item-player.vue';

export default defineComponent({
  // TODO: Migrate to <base-entity-update>
  name: 'UpdatePlayer',
  components: { ItemPlayer, BaseDialog },
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updatePlayer = ServicePlayer.useUpdate(context.player);

    const vuelidate = useVuelidate(computed(() => ({
      name: {
        required,
      },
    })), updatePlayer.entity);

    return {
      t,
      updatePlayer,
      vuelidate,
      async submit(close: () => void) {
        await updatePlayer.update();
        close();
      },
    };
  },
});
</script>

<style scoped>

</style>
