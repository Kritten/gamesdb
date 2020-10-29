<template>
  <form @submit.prevent="updateSession.update">
    <item-session
      v-model:comment="updateSession.entity.value.comment"
      v-model:is-challenge="updateSession.entity.value.isChallenge"
      v-model:players="updateSession.entity.value.players"
      v-model:winners="updateSession.entity.value.winners"
    />
    <div>
      <p>{{ t('playtime.label', 2) }}</p>
      <item-playtime
        v-model:start="updateSession.playtimeNew.value.start"
        v-model:end="updateSession.playtimeNew.value.end"
      />
      <div>
        <button
          type="button"
          @click="updateSession.playtimeAdd"
        >
          {{ t('playtime.label') }} {{ t('common.create') }}
        </button>
      </div>
      <div
        v-for="(playtime, index) in updateSession.entity.value.playtimes"
        :key="index"
      >
        <template v-if="!updateSession.entity.value.isVirtual || !isEqual(playtime.start, playtime.end)">
          <hr>
          <item-playtime
            v-model:start="playtime.start"
            v-model:end="playtime.end"
          />
          <button
            type="button"
            @click="updateSession.playtimeRemove(playtime)"
          >
            {{ t('playtime.label') }} {{ t('common.delete') }}
          </button>
        </template>
      </div>
    </div>
    <hr>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { Session } from '@/modules/session/session.model';
import ItemSession from '@/modules/session/item-session.vue';
import ItemPlaytime from '@/modules/playtime/item-playtime.vue';
import DisplayPlaytime from '@/modules/playtime/display-playtime.vue';
import { ServiceSession } from '@/modules/session/session.service';
import { defineComponent } from 'vue';
import { isEqual } from 'date-fns';

export default defineComponent({
  name: 'UpdateSession',
  components: { ItemSession, ItemPlaytime, DisplayPlaytime },
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const updateSession = ServiceSession.useUpdate(props.session);

    return {
      t,
      updateSession,
      isEqual,
    };
  },
});
</script>

<style scoped>

</style>
