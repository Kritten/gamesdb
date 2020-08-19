<template>
  <tr>
    <td>
      {{ mechanism.name }}
    </td>
    <td>
      <delete-mechanism :mechanism="mechanism" />
    </td>
    <td>
      <update-mechanism :mechanism="mechanism" />
    </td>
  </tr>
</template>

<script>
import DeleteMechanism from '@/modules/mechanism/delete/delete-mechanism';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import UpdateMechanism from '@/modules/mechanism/update/update-mechanism';

export default {
  name: 'ListItemMechanism',
  components: { UpdateMechanism, DeleteMechanism },
  props: {
    mechanism: {
      required: true,
      type: Mechanism,
    },
  },
};
</script>

<style scoped>

</style>
