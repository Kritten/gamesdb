<template>
  <base-entity-page
    :entities="universes"
    :columns="columns"

    :use-create-entity="useCreateEntity"
    :use-update-entity="useUpdateEntity"
    :use-delete-entity="useDeleteEntity"

    :validation-rules="validationRules"

    i18n-prefix="universe"
  >
    <template #item="{ entity, validation }">
      <item-universe
        v-model:name="entity.value.name"
        :validation="validation"
      />
    </template>

    <template #item-update="{ entity, validation }">
      <item-universe
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
import ItemUniverse from '@/modules/universe/item-universe.vue';
import { useDeleteUniverse } from '@/modules/universe/composables/useDeleteUniverse';
import { useUpdateUniverse } from '@/modules/universe/composables/useUpdateUniverse';
import { useCreateUniverse } from '@/modules/universe/composables/useCreateUniverse';
import { useUniverse } from '@/modules/universe/composables/useUniverse';

export default defineComponent({
  name: 'ViewUniverse',
  components: { ItemUniverse, BaseEntityPage },
  setup() {
    const { universes } = useUniverse();

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
      universes,
      columns,

      validationRules,
      useCreateEntity: useCreateUniverse,
      useUpdateEntity: useUpdateUniverse,
      useDeleteEntity: useDeleteUniverse,
    };
  },
});
</script>

<style scoped></style>
