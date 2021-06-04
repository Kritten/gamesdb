<template>
  <q-btn
    v-bind="optionsButtonMerged"
    @click="isOpen = true"
  />

  <q-dialog
    v-model="isOpen"
    :maximized="screen.lt.sm"
  >
    <q-card :style="style">
      <q-form
        @submit.prevent="$emit('submit')"
      >
        <q-toolbar>
          <q-toolbar-title>{{ title }}</q-toolbar-title>
          <q-btn
            round
            flat
            icon="fas fa-times"
            @click="isOpen = false"
          />
        </q-toolbar>
        <q-card-section class="q-gutter-md">
          <slot />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="t('common.cancel')"
            @click="isOpen = false"
          />
          <base-button-submit :label="t('common.create')" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import BaseButtonSubmit from '@/modules/app/base/base-button-submit.vue';

export default defineComponent({
  name: 'BaseDialog',
  components: { BaseButtonSubmit },
  props: {
    title: {
      required: false,
      type: String,
      default: null,
    },
    optionsButton: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submit'],
  setup(props) {
    const { t } = useI18n();
    const { screen } = useQuasar();

    return {
      t,
      screen,
      isOpen: ref(false),
      optionsButtonMerged: computed(() => ({
        flat: true,
        stretch: true,
        label: t('common.open'),
        ...props.optionsButton,
      })),
      style: computed(() => (screen.lt.sm ? {} : {
        width: '700px',
        maxWidth: '80vw',
      })),
    };
  },
});
</script>

<style scoped>

</style>
