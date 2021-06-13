<template>
  <base-entity-page
    :entities="players"
    :columns="columns"

    :use-create-entity="useCreateEntity"
    :use-update-entity="useUpdateEntity"
    :use-delete-entity="useDeleteEntity"

    :validation-rules="validationRules"

    i18n-prefix="player"
  >
    <template #item="{ entity, validation }">
      <item-player
        v-model:name="entity.value.name"
        :validation="validation"
      />
    </template>

    <template #item-update="{ entity, validation }">
      <item-player
        v-model:name="entity.value.name"
        :validation="validation"
      />
    </template>
  </base-entity-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseEntityPage from '@/modules/app/base/entity/base-entity-page.vue';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import ItemPlayer from '@/modules/player/item-player.vue';
import { required } from '@vuelidate/validators';
import { useCreatePlayer } from '@/modules/player/composables/useCreatePlayer';
import { useUpdatePlayer } from '@/modules/player/composables/useUpdatePlayer';
import { useDeletePlayer } from '@/modules/player/composables/useDeletePlayer';

export default defineComponent({
  name: 'ViewPlayer',
  components: {
    ItemPlayer, BaseEntityPage,
  },
  setup() {
    const { players } = usePlayers();

    const columns = [
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left',
        sortable: true,
      },
    ];

    const validationRules = {
      name: {
        required,
      },
    };

    return {
      players,
      columns,

      validationRules,
      useCreateEntity: useCreatePlayer,
      useUpdateEntity: useUpdatePlayer,
      useDeleteEntity: useDeletePlayer,
    };
  },
});
</script>

<style scoped></style>
