<template>
  <q-card>
    <q-card-section class="q-py-none">
      <div class="row items-center">
        <div class="col">
          {{ players.length }} {{ t('player.label', 2) }}
        </div>
        <div class="col-shrink" />
<!--        <create-player />-->
      </div>
    </q-card-section>
  </q-card>

  <q-separator spaced="lg" />

  <q-table
    dense
    :rows="players"
    :columns="columns"
    hide-bottom
    :pagination="{
      sortBy: 'name',
      descending: false,
      page: 0,
      rowsPerPage: 0,
    }"
  >
    <template #body-cell-actions="props">
      <q-td :props="props">
        <update-player :player="props.row" />
        <delete-player :player="props.row" />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreatePlayer from '@/modules/player/create/create-player.vue';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import DeletePlayer from '@/modules/player/delete/delete-player.vue';
import UpdatePlayer from '@/modules/player/update/update-player.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ListPlayers',
  components: {
    UpdatePlayer, DeletePlayer, CreatePlayer,
  },
  setup() {
    const { t } = useI18n();
    const { players } = usePlayers();

    const columns = [
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left',
        sortable: true,
      },
      {
        name: 'actions',
        label: '',
        field: 'id',
      },
    ];

    return {
      t,
      players,
      columns,
    };
  },
});
</script>

<style scoped></style>
