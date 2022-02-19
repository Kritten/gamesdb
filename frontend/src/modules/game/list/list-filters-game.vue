<template>
    <div class="row">
        <div class="col">
            <q-card>
                <q-card-section>
                    <div class="row items-center">
                        <slot>
                            <div class="text-h6">
                                {{ t('filter.label', 2) }}
                            </div>
                        </slot>
                        <div class="col" />
                        <div class="col-shrink">
                            <q-btn
                                flat
                                :label="
                                    $q.screen.gt.xs
                                        ? `${t('filter.reset')}`
                                        : undefined
                                "
                                icon="fas fa-undo"
                                padding="none md"
                                color="primary"
                                @click="$emit('reset')"
                            />
                        </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.name"
                                name="entity.name"
                                type="string"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.countPlayers"
                                name="entity.countPlayers"
                                :filter-inputs="[
                                    {
                                        name: 'countPlayersMin',
                                        operator: '<=',
                                    },
                                    {
                                        name: 'countPlayersMax',
                                        operator: '>=',
                                    },
                                ]"
                                type="int"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.isCoop"
                                name="entity.isCoop"
                                type="boolean"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.minutesPlaytimeMin"
                                name="entity.minutesPlaytimeMin"
                                :filter-inputs="[
                                    {
                                        name: 'minutesPlaytimeMin',
                                        operator: '>=',
                                    },
                                ]"
                                type="int"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.minutesPlaytimeMax"
                                name="entity.minutesPlaytimeMax"
                                :filter-inputs="[
                                    {
                                        name: 'minutesPlaytimeMax',
                                        operator: '<=',
                                    },
                                ]"
                                type="int"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.universes"
                                name="universe.id"
                                type="entity"
                                :input="inputSelectUniverse"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.moods"
                                name="mood.id"
                                type="entity"
                                :input="inputSelectMood"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.categories"
                                name="category.id"
                                type="entity"
                                :input="inputSelectCategory"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="game.filters.mechanisms"
                                name="mechanism.id"
                                type="entity"
                                :input="inputSelectMechanism"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right" />
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';
import { useUniverse } from '@/modules/universe/composables/useUniverse';
import InputSelectUniverse from '@/modules/universe/base/input-select-universe.vue';
import InputSelectMood from '@/modules/mood/base/input-select-mood.vue';
import InputSelectCategory from '@/modules/category/base/input-select-category.vue';
import InputSelectMechanism from '@/modules/mechanism/base/input-select-mechanism.vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
    name: 'ListFiltersGame',
    components: { BaseListFilter },
    props: {
        modelValue: {
            required: true,
            type: Object as PropType<ServiceCollectionFilters>,
        },
    },
    emits: ['reset', 'update-filter'],
    setup(props) {
        const { t } = useI18n();

        const { universes: itemsUniverses } = useUniverse();

        return {
            t,
            i18nPrefix: 'game',
            filters: computed(() => props.modelValue),
            itemsUniverses,
            inputSelectUniverse: InputSelectUniverse,
            inputSelectMood: InputSelectMood,
            inputSelectCategory: InputSelectCategory,
            inputSelectMechanism: InputSelectMechanism,
        };
    },
});
</script>

<style scoped />
