<template>
  <div class="row center justify-center">
    <div class="col-shrink">
      <q-spinner
        color="primary"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSpinner',
  props: {
    size: {
      required: false,
      type: String,
      default: 'md',
    },
  },
});
</script>

<style scoped>

</style>
