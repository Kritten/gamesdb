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

<script>
import DeleteUniverse from '@/modules/universe/delete/delete-universe';
import { Universe } from '@/modules/universe/universe.model';
import UpdateUniverse from '@/modules/universe/update/update-universe';

export default {
  name: 'ListItemUniverse',
  components: { UpdateUniverse, DeleteUniverse },
  props: {
    universe: {
      required: true,
      type: Universe,
    },
  },
};
</script>

<style scoped>

</style>
