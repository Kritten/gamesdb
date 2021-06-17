<template>
  <div class="row">
    <div class="col">
      <q-card>
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <div class="col">
              {{ count }} {{ t(`${i18nPrefix}.label`, 2) }}
            </div>
            <div class="col-shrink" />

            <slot name="create">
              <base-entity-create
                :i18n-prefix="i18nPrefix"
                :use-create-entity="useCreateEntity"
                :validation-rules="validationRules"
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
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseEntityCreate from '@/modules/app/base/entity/base-entity-create.vue';

export default defineComponent({
  name: 'BaseEntityHeaderInfo',
  components: { BaseEntityCreate },
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
  },
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
