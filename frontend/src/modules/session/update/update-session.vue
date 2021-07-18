<template>
  <base-entity-update
    :entity="session"
    i18n-prefix="session"
    :use-update-entity="useUpdateSession"
    :validation-rules="validationRules"
    :options-button="{ label: undefined }"
  >
    <template #item="{ entity, validation }">
      <item-session
        v-model:game="entity.value.game"
        v-model:comment="entity.value.comment"
        v-model:is-challenge="entity.value.isChallenge"
        v-model:players="entity.value.players"
        v-model:winners="entity.value.winners"
        v-model:playtimes="entity.value.playtimes"
        :validation="validation"
        :hide-game="game !== undefined"
      />
    </template>
  </base-entity-update>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { Session } from '@/modules/session/session.model';
import ItemSession from '@/modules/session/item-session.vue';
import { defineComponent, PropType } from 'vue';
import { isEqual } from 'date-fns';
import { required } from '@vuelidate/validators';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import { useUpdateSession } from '@/modules/session/composables/useUpdateSession';
import { GameLoading } from '@/modules/game/game.types';

export default defineComponent({
  name: 'UpdateSession',
  components: {
    BaseEntityUpdate,
    ItemSession,
  },
  props: {
    session: {
      required: true,
      type: Session,
    },
    game: {
      type: Object as PropType<GameLoading>,
      required: false,
      default: undefined,
    },
  },
  setup() {
    const { t } = useI18n();

    const validationRules = {
      game: {
        required,
      },
    };

    return {
      t,
      validationRules,
      isEqual,
      useUpdateSession,
    };
  },
});
</script>

<style scoped>

</style>
