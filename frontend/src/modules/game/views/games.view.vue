<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-entity-header-info
        i18n-prefix="game"
        :count="countTotalAnalog"
        :validation-rules="validationRules"
        :use-create-entity=""
      />
    </div>
    <div class="col-12">
      <!--    <create-game />-->
      <list-games analog-only />
    </div>
  </div>
</template>

<script lang="ts">
import ListGames from '@/modules/game/list/list-games.vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGames } from '@/modules/game/composables/useGames';
import BaseEntityHeaderInfo from '@/modules/app/base/entity/base-entity-header-info.vue';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'ViewGames',
  components: { BaseEntityHeaderInfo, ListGames },
  setup() {
    const { t } = useI18n();
    const { countTotalAnalog } = useGames();

    const validationRules = {
      name: {
        required,
      },
    };

    return {
      t,
      countTotalAnalog,
      validationRules,
      useCreateEntity: useCreateGa,
    };
  },
});
</script>

<style scoped></style>
