<template>
  <tr>
    <td>
      {{ universe.name }}
    </td>
    <td>
      <delete-universe :universe="universe" />
    </td>
    <td>
      <update-universe :universe="universe" />
    </td>
  </tr>
</template>

<script lang="ts">
import DeleteUniverse from '@/modules/universe/delete/delete-universe.vue';
import { Universe } from '@/modules/universe/universe.model';
import UpdateUniverse from '@/modules/universe/update/update-universe.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemUniverse',
  components: { UpdateUniverse, DeleteUniverse },
  props: {
    universe: {
      required: true,
      type: Universe,
    },
  },
});
</script>

<style scoped>

</style>
