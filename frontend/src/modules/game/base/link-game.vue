<template>
  <div class="row">
    <div
      v-if="game === null"
      class="col"
    >
      <base-spinner :size="dimension" />
    </div>
    <template v-else>
      <div class="col-shrink q-pr-sm">
        <q-img
          :src="game.images[0]"
          :width="dimension"
          :height="dimension"
          fit="contain"
        />
      </div>
      <div class="col">
        <span
          v-if="noLink"
        >
          {{ game.name }}
        </span>
        <router-link
          v-else
          :to="{name: 'game', params: {id: game.id}}"
          class="text-primary"
        >
          {{ game.name }}
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getValidator } from '@/modules/app/utilities/helpers';
import BaseSpinner from '@/modules/app/base/base-spinner.vue';

export default defineComponent({
  name: 'LinkGame',
  components: { BaseSpinner },
  props: {
    game: {
      required: true,
      validator: getValidator({ object: true, null: true }),
    },
    dimension: {
      required: false,
      type: String,
      default: '17px',
    },
    noLink: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
