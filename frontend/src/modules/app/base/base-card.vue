<template>
  <q-card>
    <q-card-section class="q-py-sm">
      <div class="row items-center title">
        <div class="col text-h6">
          {{ title }}
        </div>
        <div class="col-shrink">
          <slot name="actions" />
        </div>
      </div>
    </q-card-section>

    <slot name="default" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseCard',
  props: {
    title: {
      required: true,
      type: String,
    },
  },
});
</script>

<style scoped>
.title {
  min-height: 36px;
}
</style>
