<template>
    <base-entity-page
        :entities="moods"
        :columns="columns"
        :use-create-entity="useCreateEntity"
        :use-update-entity="useUpdateEntity"
        :use-delete-entity="useDeleteEntity"
        :validation-rules="validationRules"
        i18n-prefix="mood"
    >
        <template #item="{ entity, validation }">
            <item-mood
                v-model:name="entity.value.name"
                :validation="validation"
            />
        </template>

        <template #item-update="{ entity, validation }">
            <item-mood
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
import { useMood } from '@/modules/mood/composables/useMood';
import { useUpdateMood } from '@/modules/mood/composables/useUpdateMood';
import { useCreateMood } from '@/modules/mood/composables/useCreateMood';
import { useDeleteMood } from '@/modules/mood/composables/useDeleteMood';
import ItemMood from '@/modules/mood/item-mood.vue';

export default defineComponent({
    name: 'ViewMood',
    components: { ItemMood, BaseEntityPage },
    setup() {
        const { moods } = useMood();

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
            moods,
            columns,

            validationRules,
            useCreateEntity: useCreateMood,
            useUpdateEntity: useUpdateMood,
            useDeleteEntity: useDeleteMood,
        };
    },
});
</script>

<style scoped></style>
