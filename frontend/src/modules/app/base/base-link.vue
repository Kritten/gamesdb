<template>
  <a
    v-if="path !== undefined"
    :href="path"
    target="_blank"
  >
    {{ options.label }}
  </a>
  <router-link
    v-else
    v-bind="{
      ...options
    }"
  >
    {{ options.label }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLink',
  props: {
    path: {
      required: false,
      type: String,
      default: undefined,
    },
    options: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped>

</style>
