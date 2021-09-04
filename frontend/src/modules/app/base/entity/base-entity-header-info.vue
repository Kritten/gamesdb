<template>
  <div class="row">
    <div class="col">
      <base-card :title="`${count} ${t(`${i18nPrefix}.label`, count)}`">
        <template #actions>
          <slot name="create">
            <base-entity-create
              :i18n-prefix="i18nPrefix"
              :use-create-entity="useCreateEntity"
              :validation-rules="validationRules"
              :values-initial="valuesInitial"
              @submit="$emit('submitCreate', $event)"
            >
              <template #item="propsCreate">
                <slot
                  name="item"
                  v-bind="propsCreate"
                />
              </template>
            </base-entity-create>
          </slot>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseEntityCreate from '@/modules/app/base/entity/base-entity-create.vue';
import BaseCard from '@/modules/app/base/base-card.vue';

export default defineComponent({
  name: 'BaseEntityHeaderInfo',
  components: { BaseCard, BaseEntityCreate },
  props: {
    i18nPrefix: {
      required: true,
      type: String,
    },
    count: {
      required: true,
      type: Number,
    },
    validationRules: {
      required: false,
      type: Object,
      default: undefined,
    },
    useCreateEntity: {
      required: true,
      type: Function,
    },
    valuesInitial: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submitCreate'],
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<style scoped>

</style>
