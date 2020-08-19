<template>
  <form @submit.prevent="createMechanism.create">
    <div>
      <label for="name">{{ t('mechanism.label') }}</label>
      <input
        id="name"
        v-model="createMechanism.mechanism.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServiceMechanism } from '@/modules/mechanism/mechanism.service';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CreateMechanism',
  setup() {
    const { t } = useI18n();
    const createMechanism = ServiceMechanism.useCreate();

    return {
      t,
      createMechanism,
    };
  },
};
</script>

<style scoped>

</style>
