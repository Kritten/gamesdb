<template>
  <a
    v-if="path !== undefined"
    :href="path"
    target="_blank"
  >
    <slot name="default">
      {{ options.label }}
    </slot>
  </a>
  <router-link
    v-else
    v-bind="{
      ...options
    }"
  >
    <slot name="default">
      {{ options.label }}
    </slot>
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

<style lang="scss">
a {
  text-decoration: none;
  color: var(--q-primary)
}
</style>
