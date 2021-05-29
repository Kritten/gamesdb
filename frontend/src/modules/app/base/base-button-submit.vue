<template>
  <q-btn
    color="primary"
    type="submit"
    :label="label"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButtonSubmit',
  props: {
    label: {
      required: true,
      type: String,
    },
  },
});
</script>

<style scoped>

</style>
