<template>
    <base-input-select
        ref="baseInputSelect"
        :model-value="modelValue"
        :validation="validation"
        :options="{
            label: t('game.label'),
            items: collectionGame.items.value,
            useInput: true,
            loading: collectionGame.isLoading.value,
            displayValue: modelValue ? modelValue.name : '',
            clearable: true,
            autofocus: true,
        }"
        :on-scroll="onScroll"
        :filter="filterFn"
        @update:model-value="updateGame"
    >
        <template #option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
                <q-item-section>
                    <link-game
                        :game="opt.value"
                        no-link
                    />
                </q-item-section>
            </q-item>
        </template>
    </base-input-select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { QSelect } from 'quasar';
import { Validation } from '@vuelidate/core';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { Game } from '@/modules/game/game.model';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceGame } from '@/modules/game/game.service';
import { GameLoading } from '@/modules/game/game.types';
import LinkGame from '@/modules/game/base/link-game.vue';

export default defineComponent({
    name: 'InputSelectGame',
    components: { LinkGame, BaseInputSelect },
    props: {
        modelValue: {
            required: false,
            type: Game,
            default: undefined,
        },
        validation: {
            required: false,
            type: Object as PropType<Validation>,
            default: undefined,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { t } = useI18n();

        const baseInputSelect = ref<{ refresh: () => void } | null>(null);

        const filtersGame = ref<ServiceCollectionFilters>({
            name: {
                field: 'entity.name',
                valueString: undefined,
                operator: 'like',
            },
        });

        const collectionGame = useCollection<GameLoading>(
            ServiceGame.loadPage,
            {
                inputCollectionData: { count: 50, filters: filtersGame },
                watchFilters: false,
                immediate: false,
            }
        );

        watch(collectionGame.isLoading, (value) => {
            if (value === false) {
                if (baseInputSelect.value !== null) {
                    baseInputSelect.value.refresh();
                }
            }
        });

        return {
            t,
            collectionGame,
            filtersGame,
            baseInputSelect,
            onScroll({ to, ref: refSelect }: { to: unknown; ref: QSelect }) {
                const lastIndex = collectionGame.items.value.length - 1;

                if (collectionGame.hasNextPage.value && to === lastIndex) {
                    void collectionGame.loadNextItems().then(() => {
                        refSelect.refresh();
                    });
                }
            },
            filterFn(val: string, update: (callback: () => void) => void) {
                if (val === '') {
                    filtersGame.value.name.valueString = undefined;
                } else {
                    filtersGame.value.name.valueString = val;
                }

                void collectionGame.reset().then(() => {
                    update(() => {});
                });
            },
            updateGame(event: { value: unknown }) {
                emit('update:modelValue', event);
            },
        };
    },
});
</script>

<style scoped></style>
