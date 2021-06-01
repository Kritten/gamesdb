<template>
  <base-input-select
    :model-value="modelValue"
    :options="{
      label: t('player.label'),
      items: players,
      useInput: true,
      optionLabel:'name',
    }"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useI18n } from 'vue-i18n';
import { Player } from '@/modules/player/player.model';
import { usePlayers } from '@/modules/player/composables/usePlayers';

export default defineComponent({
  name: 'InputSelectPlayer',
  components: { BaseInputSelect },
  props: {
    modelValue: {
      required: false,
      type: [Object, Array] as PropType<Player | Array<Player>>,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const { t } = useI18n();
    const { players } = usePlayers();

    return {
      t,
      players,
    };
  },
});
</script>

<style scoped>

</style>
