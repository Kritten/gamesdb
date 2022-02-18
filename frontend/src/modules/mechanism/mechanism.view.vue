<template>
    <base-entity-page
        :entities="mechanisms"
        :columns="columns"
        :use-create-entity="useCreateEntity"
        :use-update-entity="useUpdateEntity"
        :use-delete-entity="useDeleteEntity"
        :validation-rules="validationRules"
        i18n-prefix="mechanism"
    >
        <template #item="{ entity, validation }">
            <item-mechanism
                v-model:name="entity.value.name"
                :validation="validation"
            />
        </template>

        <template #item-update="{ entity, validation }">
            <item-mechanism
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
import { useMechanism } from '@/modules/mechanism/composables/useMechanism';
import { useUpdateMechanism } from '@/modules/mechanism/composables/useUpdateMechanism';
import { useCreateMechanism } from '@/modules/mechanism/composables/useCreateMechanism';
import { useDeleteMechanism } from '@/modules/mechanism/composables/useDeleteMechanism';
import ItemMechanism from '@/modules/mechanism/item-mechanism.vue';

export default defineComponent({
    name: 'ViewMechanism',
    components: { ItemMechanism, BaseEntityPage },
    setup() {
        const { mechanisms } = useMechanism();

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
            mechanisms,
            columns,

            validationRules,
            useCreateEntity: useCreateMechanism,
            useUpdateEntity: useUpdateMechanism,
            useDeleteEntity: useDeleteMechanism,
        };
    },
});
</script>

<style scoped></style>
