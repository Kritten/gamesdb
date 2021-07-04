<template>
  <router-view v-if="isInitialized" />
  <div v-else>
    <base-spinner />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceApp } from '@/modules/app/app.service';
import { useApp } from '@/modules/app/composables/useApp';
import BaseSpinner from '@/modules/app/base/base-spinner.vue';

export default defineComponent({
  name: 'App',
  components: { BaseSpinner },
  setup() {
    void ServiceApp.initialize();
    const { isInitialized } = useApp();

    // navigator.serviceWorker.addEventListener(
    //   'controllerchange', () => {
    //     window.location.reload();
    //   },
    // );

    return { isInitialized };
  },
});
</script>
