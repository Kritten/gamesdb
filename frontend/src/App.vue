<template>
  <router-view v-if="store.state.isInitialized" />
  <div v-else>
    Loading
  </div>
</template>

<script lang="ts">
import { ServiceApp } from '@/modules/app/app.service';
import { useStore } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    ServiceApp.initialize();
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
