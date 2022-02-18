<template>
    <base-input-select
        :model-value="modelValue"
        :options="optionsMerged"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { Player } from '@/modules/player/player.model';
import { usePlayers } from '@/modules/player/composables/usePlayers';
import { TypeOptionsInput } from '@/modules/app/base/inputs/base-input';

export default defineComponent({
    name: 'InputSelectPlayer',
    components: { BaseInputSelect },
    props: {
        modelValue: {
            required: false,
            type: [Object, Array] as PropType<Player | Array<Player>>,
            default: undefined,
        },
        options: {
            required: false,
            type: Object as PropType<Partial<TypeOptionsInput>>,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue'],
    setup(props) {
        const { t } = useI18n();
        const { players } = usePlayers();

        return {
            t,
            players,
            optionsMerged: computed(() => ({
                label: t('player.label'),
                items: players.value,
                useInput: true,
                optionValue: 'id',
                optionLabel: 'name',
                clearable: true,
                ...props.options,
            })),
        };
    },
});
</script>

<style scoped></style>
