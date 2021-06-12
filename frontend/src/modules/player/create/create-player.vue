<template>
  <base-dialog
    :title="`${t('player.label')} ${t('common.create')}`"
    :text-submit="t('common.create')"
    :options-button="{
      label: `${t('player.label')} ${t('common.create')}`,
    }"
    :validation="vuelidate"
    @submit="submit"
  >
    <item-player
      v-model:name="createPlayer.entity.value.name"
      :validation="vuelidate"
    />
  </base-dialog>
</template>

<script lang="ts">
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';
import { computed, defineComponent } from 'vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import ItemPlayer from '@/modules/player/item-player.vue';

export default defineComponent({
  // TODO: Migrate to <base-entity-create>
  name: 'CreatePlayer',
  components: { ItemPlayer, BaseDialog },
  setup() {
    const { t } = useI18n();
    const createPlayer = ServicePlayer.useCreate();

    const vuelidate = useVuelidate(computed(() => ({
      name: {
        required,
      },
    })), createPlayer.entity);

    return {
      t,
      createPlayer,
      vuelidate,
      async submit(close: () => void) {
        await createPlayer.create();
        close();
      },
    };
  },
});
</script>

<style scoped>

</style>
