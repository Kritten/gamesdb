<template>
  <tr>
    <td>
      {{ mood.name }}
    </td>
    <td>
      <delete-mood :mood="mood" />
    </td>
    <td>
      <update-mood :mood="mood" />
    </td>
  </tr>
</template>

<script>
import DeleteMood from '@/modules/mood/delete/delete-mood';
import { Mood } from '@/modules/mood/mood.model';
import UpdateMood from '@/modules/mood/update/update-mood';

export default {
  name: 'ListItemMood',
  components: { UpdateMood, DeleteMood },
  props: {
    mood: {
      required: true,
      type: Mood,
    },
  },
};
</script>

<style scoped>

</style>
