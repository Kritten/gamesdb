<template>
  <q-card>
    <q-expansion-item
      expand-icon-toggle
      expand-icon-class="base-card-expand-icon"
      :class="{
        'base-card-hide-expand-icon': !expandable,
      }"
    >
      <template #header>
        <q-item-section>
          <div class="row items-center base-card-title">
            <div class="col text-h6">
              {{ title }}
            </div>
            <div class="col-shrink">
              <slot name="actions" />
            </div>
          </div>
        </q-item-section>
      </template>

      <slot name="default" />
    </q-expansion-item>
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
    expandable: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.base-card-title {
  min-height: 36px;
}

.base-card-hide-expand-icon .base-card-expand-icon {
  display: none;
}
</style>
