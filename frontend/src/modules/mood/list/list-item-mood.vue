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

<script lang="ts">
import DeleteMood from '@/modules/mood/delete/delete-mood.vue';
import { Mood } from '@/modules/mood/mood.model';
import UpdateMood from '@/modules/mood/update/update-mood.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemMood',
  components: { UpdateMood, DeleteMood },
  props: {
    mood: {
      required: true,
      type: Mood,
    },
  },
});
</script>

<style scoped>

</style>
