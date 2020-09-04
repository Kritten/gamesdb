<template>
  <template v-if="lastSession.session.value !== undefined">
    {{ lastSession.session.value.game.name }} am
    <base-date-time
      :value="lastSession.lastDate.value"
      date-only
    />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceSession } from '@/modules/session/session.service';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';

export default defineComponent({
  name: 'LastSession',
  components: { BaseDateTime },
  props: {
    analogOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    digitalOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const lastSession = ServiceSession.useLastSession({
      analogOnly: props.analogOnly,
      digitalOnly: props.digitalOnly,
    });
    return {
      lastSession,
    };
  },
});
</script>

<style scoped>

</style>
