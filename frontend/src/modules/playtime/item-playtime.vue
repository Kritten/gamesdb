<template>
  <div>
    <label>{{ t('playtime.start') }}
      <small>(<base-date-time
        :value="startInternal"
        :compact="true"
      />)</small>
    </label>
    <datetime-picker v-model="startInternal" />
  </div>
  <div>
    <label>{{ t('playtime.end') }}
      <small>(<base-date-time
        :value="endInternal"
        :compact="true"
      />)</small>
    </label>
    <datetime-picker v-model="endInternal" />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import DatetimePicker from '@/modules/app/base/datetime-picker.vue';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemPlaytime',
  components: { DatetimePicker, BaseDateTime },
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
    const store = useStore();

    return {
      t,
      store,
      startInternal: useModelWrapper({
        props, emit, name: 'start',
      }),
      endInternal: useModelWrapper({
        props, emit, name: 'end',
      }),
    };
  },
});
</script>

<style scoped>

</style>
