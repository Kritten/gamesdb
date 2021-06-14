<template>
  <base-entity-page
    :entities="mechanisms"
    :columns="columns"

    :use-create-entity="useCreateEntity"
    :use-update-entity="useUpdateEntity"
    :use-delete-entity="useDeleteEntity"

    :validation-rules="validationRules"

    i18n-prefix="category"
  >
    <template #item="{ entity, validation }">
      <item-category
        v-model:name="entity.value.name"
        :validation="validation"
      />
    </template>

    <template #item-update="{ entity, validation }">
      <item-category
        v-model:name="entity.value.name"
        :validation="validation"
      />
    </template>
  </base-entity-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { required } from '@vuelidate/validators';
import BaseEntityPage from '@/modules/app/base/entity/base-entity-page.vue';
import { useCreateCategory } from '@/modules/category/composables/useCreateCategory';
import { useDeleteCategory } from '@/modules/category/composables/useDeleteCategory';
import { useUpdateCategory } from '@/modules/category/composables/useUpdateCategory';
import { useCategory } from '@/modules/category/composables/useCategory';
import ItemCategory from '@/modules/category/item-category.vue';

export default defineComponent({
  name: 'ViewMechanism',
  components: { ItemCategory, BaseEntityPage },
  setup() {
    const { categories } = useCategory();

    const columns = [
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left',
        sortable: true,
      },
    ];

    const validationRules = {
      name: {
        required,
      },
    };

    return {
      mechanisms: categories,
      columns,

      validationRules,
      useCreateEntity: useCreateCategory,
      useUpdateEntity: useUpdateCategory,
      useDeleteEntity: useDeleteCategory,
    };
  },
});
</script>

<style scoped></style>
