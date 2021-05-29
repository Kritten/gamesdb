<template>
  <router-view v-if="isInitialized" />
  <div v-else>
    Loading
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceApp } from '@/modules/app/app.service';
import { useApp } from '@/modules/app/composables/useApp';

export default defineComponent({
  name: 'App',
  setup() {
    void ServiceApp.initialize();
    const { isInitialized } = useApp();

    return { isInitialized };
  },
});
</script>
