<template>
  <form @submit.prevent="createUniverse.create">
    <div>
      <label for="name">{{ t('universe.label') }}</label>
      <input
        id="name"
        v-model="createUniverse.entity.value.name"
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
import { ServiceUniverse } from '@/modules/universe/universe.service';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CreateUniverse',
  setup() {
    const { t } = useI18n();
    const createUniverse = ServiceUniverse.useCreate();

    return {
      t,
      createUniverse,
    };
  },
};
</script>

<style scoped>

</style>
