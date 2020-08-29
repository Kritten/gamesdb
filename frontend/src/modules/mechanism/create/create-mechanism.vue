<template>
  <form @submit.prevent="createMechanism.create">
    <div>
      <label for="name">{{ t('mechanism.label') }}</label>
      <input
        id="name"
        v-model="createMechanism.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { ServiceMechanism } from '@/modules/mechanism/mechanism.service';
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateMechanism',
  setup() {
    const { t } = useI18n();
    const createMechanism = ServiceMechanism.useCreate();

    return {
      t,
      createMechanism,
    };
  },
});
</script>

<style scoped>

</style>
