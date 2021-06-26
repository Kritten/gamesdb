<template>
  <base-entity-delete
    :entity="session"
    i18n-prefix="session"
    :use-delete-entity="useDeleteSession"
  />
</template>

<script lang="ts">
import { Session } from '@/modules/session/session.model';
import { defineComponent } from 'vue';
import BaseEntityDelete from '@/modules/app/base/entity/base-entity-delete.vue';
import { useDeleteSession } from '@/modules/session/composables/useDeleteSession';

export default defineComponent({
  name: 'DeleteSession',
  components: { BaseEntityDelete },
  props: {
    session: {
      required: true,
      type: Session,
    },
  },
  setup() {
    return {
      useDeleteSession,
    };
  },
});
</script>

<style scoped>

</style>
