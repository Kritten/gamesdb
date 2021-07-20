<template>
  <div class="row q-gutter-md">
    <div class="col-shrink">
      <base-input-datetime
        v-model="startInternal"
        :options="{
          label: t('playtime.start'),
        }"
      />
    </div>

    <q-space />

    <div class="col-shrink">
      <base-input-datetime
        v-model="endInternal"
        :options="{
          label: t('playtime.end'),
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import BaseInputDatetime from '@/modules/app/base/inputs/base-input-datetime.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemPlaytime',
  components: { BaseInputDatetime },
  props: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    return {
      t,
      startInternal: useModelWrapper<Date>({
        props, emit, name: 'start',
      }),
      endInternal: useModelWrapper<Date>({
        props, emit, name: 'end',
      }),
    };
  },
});
</script>

<style scoped>

</style>
