<template>
  <el-button
    type="primary"
    native-type="submit"
  >
    {{ label }}
  </el-button>
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
