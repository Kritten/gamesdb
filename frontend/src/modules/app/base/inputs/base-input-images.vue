<template>
  <div class="row">
    <div class="col">
      <base-input-text
        v-model="imageNew"
        :options="{
          label: t('image.new')
        }"
      />
    </div>
    <div class="col-shrink">
      <q-btn
        flat
        :disable="imageNew.trim() === ''"
        color="primary"
        icon="fa fa-plus"
        :label="t('common.add')"
        @click="addImage"
      />
    </div>
  </div>
  <div class="row q-col-gutter-md">
    <div
      v-for="image in modelValue"
      :key="image"
      class="col-4"
      style="position: relative"
    >
      <q-img
        :src="image"
        height="100px"
        fit="contain"
      />
      <q-btn
        class="button-delete-image"
        icon="fa fa-times"
        color="negative"
        round
        size="sm"
        @click="removeImage(image)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Validation } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';

export default defineComponent({
  name: 'BaseInputImages',
  components: { BaseInputText },
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    options: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const imageNew = ref('');

    return {
      t,
      imageNew,
      addImage() {
        if (props.modelValue.find((image) => image === imageNew.value) === undefined) {
          emit('update:modelValue', [...props.modelValue, imageNew.value]);
          imageNew.value = '';
        }
      },
      removeImage(imageToBeDeleted: string) {
        emit('update:modelValue', props.modelValue.filter((image) => imageToBeDeleted !== image));
      },
    };
  },
});
</script>

<style scoped>
.button-delete-image {
  position: absolute;
  right: 0;
}
</style>
