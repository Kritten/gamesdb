<template>
  <form @submit.prevent="updateUniverse.update">
    <div>
      <label for="name">{{ t('universe.label') }}</label>
      <input
        id="name"
        v-model="updateUniverse.universe.value.name"
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
import { ServiceUniverse } from '@/modules/universe/universe.service';
import { useI18n } from 'vue-i18n';
import { Universe } from '@/modules/universe/universe.model';

export default {
  name: 'UpdateUniverse',
  props: {
    universe: {
      required: true,
      type: Universe,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateUniverse = ServiceUniverse.useUpdate(context.universe);

    return {
      t,
      updateUniverse,
    };
  },
};
</script>

<style scoped>

</style>
