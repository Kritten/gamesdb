<template>
  <form @submit.prevent="updateMechanism.update">
    <div>
      <label for="name">{{ t('mechanism.label') }}</label>
      <input
        id="name"
        v-model="updateMechanism.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServiceMechanism } from '@/modules/mechanism/mechanism.service';
import { useI18n } from 'vue-i18n';
import {Mechanism} from "@/modules/mechanism/mechanism.model";

export default {
  name: 'UpdateMechanism',
  props: {
    mechanism: {
      required: true,
      type: Mechanism,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateMechanism = ServiceMechanism.useUpdate(context.mechanism);

    return {
      t,
      updateMechanism,
    };
  },
};
</script>

<style scoped>

</style>
