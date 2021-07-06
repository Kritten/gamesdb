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
        @submit.prevent="submit"
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

        <q-card-section
          :class="{
            'q-pa-none': removePaddingContent,
          }"
        >
          <slot />
        </q-card-section>

        <!--        <q-card-section>-->
        <!--          <table>-->
        <!--            <tr>-->
        <!--              <td colspan="2">-->
        <!--                {{ validation }}-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <td>$dirty</td>-->
        <!--              <td>{{ validation?.$dirty }}</td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <td>$anyDirty</td>-->
        <!--              <td>{{ validation?.$anyDirty }}</td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <td>$invalid</td>-->
        <!--              <td>{{ validation?.$invalid }}</td>-->
        <!--            </tr>-->
        <!--          </table>-->
        <!--        </q-card-section>-->

        <q-card-actions
          v-if="hideActions === false"
          align="right"
        >
          <q-btn
            :label="t('common.cancel')"
            @click="close"
          />
          <slot
            name="buttons"
            :close="close"
          />
          <base-button-submit
            :label="textSubmit"
            :options="{
              disabled: validation?.$dirty && validation?.$invalid,
            }"
            v-bind="optionsButtonSubmit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import BaseButtonSubmit from '@/modules/app/base/base-button-submit.vue';
import { i18n } from '@/boot/i18n';
import { Validation } from '@vuelidate/core';

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
    optionsButtonSubmit: {
      required: false,
      type: Object,
      default: () => ({}),
    },
    textSubmit: {
      required: false,
      type: String,
      default: i18n.global.t('common.create'),
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    hideActions: {
      required: false,
      type: Boolean,
      default: false,
    },
    removePaddingContent: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { screen } = useQuasar();

    const isOpen = ref(false);

    const open = () => {
      isOpen.value = true;
    };
    const close = () => {
      isOpen.value = false;
      if (props.validation) {
        props.validation.$reset();
      }
    };

    // watch(isOpen, () => {
    //   if (isOpen.value === false && props.validation) {
    //     props.validation.$reset();
    //   }
    // });

    return {
      t,
      screen,
      isOpen,
      open,
      close,
      optionsButtonMerged: computed(() => {
        const result = {
          flat: true,
          stretch: true,
          label: t('common.open'),
          ...props.optionsButton,
        };

        if (screen.lt.sm) {
          result.label = '';
        }

        return result;
      }),
      style: computed(() => (screen.lt.sm ? {} : {
        width: '700px',
        maxWidth: '80vw',
      })),
      async submit() {
        if (props.validation !== undefined) {
          const result = await props.validation.$validate();
          if (result) {
            props.validation.$reset();
            emit('submit', close);
          }
        } else {
          emit('submit', close);
        }
      },
    };
  },
});
</script>

<style scoped>

</style>
