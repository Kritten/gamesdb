<template>
  <details>
    <summary>{{ t('image.label', 2) }}</summary>

    <input
      v-model="filters.name.valueString"
    >
    <div v-for="image in collectionImage.items.value">
      {{ image.name }} <button
        type="button"
        @click="$emit('update:modelValue', [...modelValue, image])"
      >
        {{ t('common.add') }}
      </button>
    </div>

    <h3>Hinzugefügte Bilder</h3>
    <div v-for="image in modelValue">
      {{ image.name }} <button
        type="button"
        @click="$emit('update:modelValue', modelValue.filter(img => img.id !== image.id))"
      >
        {{ t('common.delete') }}
      </button>
    </div>
  </details>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Validation } from '@vuelidate/core';
import { Image } from '@/modules/image/image.model';
import { useI18n } from 'vue-i18n';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceImage } from '@/modules/image/image.service';

export default defineComponent({
  name: 'BaseInputImages',
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<Array<Image>>,
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
  setup() {
    const { t } = useI18n();

    const filters = ref<ServiceCollectionFilters>({
      name: {
        field: 'name', valueString: undefined, operator: 'like',
      },
    });
    const collectionImage = useCollection<Image>(ServiceImage.loadPage, { inputCollectionData: { count: 5, filters } });

    return {
      t,
      filters,
      collectionImage,
    };
  },
});
</script>

<style scoped>

</style>
