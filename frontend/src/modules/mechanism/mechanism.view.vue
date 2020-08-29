<template>
  <list-mechanisms />
</template>

<script lang="ts">
import ListMechanisms from '@/modules/mechanism/list/list-mechanism.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewGame',
  components: { ListMechanisms },
});
</script>

<style scoped></style>
