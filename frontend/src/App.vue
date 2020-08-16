<template>
  <router-view v-if="store.state.isInitialized" />
  <div v-else>
    Loading
  </div>
</template>

<script>
import { ServiceApp } from '@/modules/app/app.service';
import { useStore } from 'vuex';

export default {
  setup() {
    ServiceApp.initialize();
    const store = useStore();
    return {
      store,
    };
  },
};
</script>
