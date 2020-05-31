<template>
  {{ store.state.isInitialized }}
  <router-view v-if="store.state.isInitialized" />
  <div v-else>
    Loading
  </div>
</template>

<script>
import { ServiceApp } from '@/modules/app/app.service';
import { useStore } from 'vuex';
import { toRefs, ref, computed } from 'vue';

export default {
  setup() {
    ServiceApp.initialize();
    const store = useStore();

    // const isInitialized = computed(() => store.state.isInitialized);
    // const isInitialized = ref(store.state.isInitialized);
    // const isInitialized = store.state.isInitialized;
    // console.warn(isInitialized, 'isInitialized');
    // console.log(store.state.isInitialized, 'store');
    //
    // setTimeout(() => {
    //   store.dispatch('setIsInitalized', true);
    // }, 2000);

    return {
      // isInitialized,
      store,
    };
  },
};
</script>
