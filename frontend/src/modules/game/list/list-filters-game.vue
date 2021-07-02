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
                :label="$q.screen.gt.xs ? `${t('filter.reset')}`: undefined"
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
                name="name"
                type="string"
                @update-filter="$emit('update-filter', $event)"
              />
            </div>
            <div class="col-12 col-md-6">
              <base-list-filter
                :filters="filters"
                label="game.filters.countPlayers"
                name="countPlayers"
                :filter-inputs="[{
                  name: 'countPlayersMin',
                  operator: '<=',
                },{
                  name: 'countPlayersMax',
                  operator: '>=',
                }]"
                type="int"
                @update-filter="$emit('update-filter', $event)"
              />
            </div>
            <div class="col-12 col-md-6">
              <base-list-filter
                :filters="filters"
                label="game.filters.isCoop"
                name="isCoop"
                type="boolean"
                @update-filter="$emit('update-filter', $event)"
              />
            </div>
            <div class="col-12 col-md-6">
              <base-list-filter
                :filters="filters"
                label="game.filters.minutesPlaytimeMin"
                name="minutesPlaytimeMin"
                :filter-inputs="[{
                  name: 'minutesPlaytimeMin',
                  operator: '>=',
                }]"
                type="int"
                @update-filter="$emit('update-filter', $event)"
              />
            </div>
            <div class="col-12 col-md-6">
              <base-list-filter
                :filters="filters"
                label="game.filters.minutesPlaytimeMax"
                name="minutesPlaytimeMax"
                :filter-inputs="[{
                  name: 'minutesPlaytimeMax',
                  operator: '<=',
                }]"
                type="int"
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
import {
  defineComponent, computed,
} from 'vue';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ListFiltersGame',
  components: { BaseListFilter },
  props: {
    modelValue: {
      required: true,
      type: Object,
    },
  },
  emits: ['reset', 'update-filter'],
  setup(props) {
    const { t } = useI18n();

    return {
      t,
      i18nPrefix: 'game',
      filters: computed(() => props.modelValue),
    };
  },
});
</script>

<style scoped />
