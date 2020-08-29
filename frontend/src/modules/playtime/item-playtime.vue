<template>
  <div>
    <label>{{ t('playtime.start') }}</label>
    <datetime-picker v-model="startInternal" />
  </div>
  <div>
    <label>{{ t('playtime.end') }}</label>
    <datetime-picker v-model="endInternal" />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import DatetimePicker from '@/modules/app/base/datetime-picker.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemPlaytime',
  components: { DatetimePicker },
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
