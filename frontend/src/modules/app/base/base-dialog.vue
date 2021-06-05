<template>
  <slot
    name="activator"
    :open="open"
  >
    <q-btn
      v-bind="optionsButtonMerged"
      @click="open"
    />
  </slot>

  <q-dialog
    v-model="isOpen"
    :maximized="screen.lt.sm"
  >
    <q-card :style="style">
      <q-form
        @submit.prevent="$emit('submit', close)"
      >
        <q-toolbar>
          <q-toolbar-title>
            {{ title }}
          </q-toolbar-title>
          <q-btn
            round
            flat
            icon="fas fa-times"
            @click="close"
          />
        </q-toolbar>
        <q-card-section class="q-gutter-md">
          <slot />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="t('common.cancel')"
            @click="close"
          />
          <slot name="buttons" />
          <base-button-submit :label="textSubmit" />
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
import { i18n } from '@/boot/i18n';

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
    textSubmit: {
      required: false,
      type: String,
      default: i18n.global.t('common.create'),
    },
  },
  emits: ['submit'],
  setup(props) {
    const { t } = useI18n();
    const { screen } = useQuasar();

    const isOpen = ref(false);

    return {
      t,
      screen,
      isOpen,
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
      open() {
        isOpen.value = true;
      },
      close() {
        isOpen.value = false;
      },
    };
  },
});
</script>

<style scoped>

</style>
