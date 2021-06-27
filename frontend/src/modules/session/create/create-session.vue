<template>
  <base-entity-create
    i18n-prefix="session"
    :validation-rules="validationRules"
    :use-create-entity="useCreateEntity"
    :options-button="optionsButton"
    :values-initial="{ game }"
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

    <template #buttons="{ close, entity, validation }">
      <q-btn
        :label="t('session.start')"
        color="secondary"
        @click="start(close, entity, validation)"
      />
    </template>
  </base-entity-create>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { Game } from '@/modules/game/game.model';
import ItemSession from '@/modules/session/item-session.vue';
import {
  computed, defineComponent, Ref,
} from 'vue';
import useVuelidate, { Validation } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import BaseEntityCreate from '@/modules/app/base/entity/base-entity-create.vue';
import { useCreateSession } from '@/modules/session/composables/useCreateSession';
import { Session } from '@/modules/session/session.model';

export default defineComponent({
  name: 'CreateSession',
  components: {
    BaseEntityCreate,
    ItemSession,
  },
  props: {
    game: {
      type: Game,
      required: false,
      default: undefined,
    },
    optionsButton: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { t } = useI18n();

    const useTrackSession = ServiceSession.useTrackSession();

    const validationRules = {
      game: {
        required,
      },
      players: {
        required,
      },
      playtimes: {
        required,
      },
    };

    return {
      t,
      validationRules,
      useCreateEntity: useCreateSession,
      async start(close: () => void, entity: Ref<Session>, validation: Validation) {
        validation.$reset();

        const vuelidateStart = useVuelidate(computed(() => ({
          game: {
            required,
          },
        })), entity);

        const result = await vuelidateStart.value.$validate();

        if (result) {
          await useTrackSession.start(entity, props.game as Game);
          close();
        } else {
          validation.game.$touch();
        }
      },
    };
  },
});
</script>

<style scoped>

</style>
