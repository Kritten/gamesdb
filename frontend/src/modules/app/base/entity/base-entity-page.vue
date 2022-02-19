<template>
    <div class="row q-col-gutter-md">
        <div class="col-12">
            <base-entity-header-info
                :i18n-prefix="i18nPrefix"
                :count="entities.length"
                :validation-rules="
                    validationRulesCreate
                        ? validationRulesCreate
                        : validationRules
                "
                :use-create-entity="useCreateEntity"
            >
                <template #item="propsCreate">
                    <slot
                        name="item"
                        v-bind="propsCreate"
                    />
                </template>
            </base-entity-header-info>
        </div>

        <div class="col-12">
            <q-table
                dense
                :rows="entities"
                :columns="columnsComputed"
                hide-bottom
                :pagination="{
                    sortBy: 'name',
                    descending: false,
                    page: 0,
                    rowsPerPage: 0,
                }"
            >
                <template #body-cell-actions="props">
                    <q-td :props="props">
                        <base-entity-update
                            :entity="props.row"
                            :i18n-prefix="i18nPrefix"
                            :use-update-entity="useUpdateEntity"
                            :validation-rules="
                                validationRulesUpdate
                                    ? validationRulesUpdate
                                    : validationRules
                            "
                        >
                            <template #item="propsUpdate">
                                <slot
                                    name="item-update"
                                    v-bind="propsUpdate"
                                />
                            </template>
                        </base-entity-update>

                        <base-entity-delete
                            :entity="props.row"
                            :i18n-prefix="i18nPrefix"
                            :use-delete-entity="useDeleteEntity"
                        />
                    </q-td>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import BaseEntityDelete from '@/modules/app/base/entity/base-entity-delete.vue';
import BaseEntityHeaderInfo from '@/modules/app/base/entity/base-entity-header-info.vue';

export default defineComponent({
    name: 'BaseEntityPage',
    components: {
        BaseEntityHeaderInfo,
        BaseEntityDelete,
        BaseEntityUpdate,
    },
    props: {
        entities: {
            required: true,
            type: Array as PropType<Array<Entity>>,
        },
        columns: {
            required: true,
            type: Array as PropType<Array<Record<string, unknown>>>,
        },
        i18nPrefix: {
            required: true,
            type: String,
        },

        useCreateEntity: {
            required: true,
            type: Function,
        },
        useUpdateEntity: {
            required: true,
            type: Function,
        },
        useDeleteEntity: {
            required: true,
            type: Function,
        },

        validationRules: {
            required: false,
            type: Object,
            default: undefined,
        },
        validationRulesCreate: {
            required: false,
            type: Object,
            default: undefined,
        },
        validationRulesUpdate: {
            required: false,
            type: Object,
            default: undefined,
        },
    },
    emits: ['submitCreate'],
    setup(props) {
        const { t } = useI18n();

        const columnsComputed = computed(() =>
            props.columns.concat([
                {
                    name: 'actions',
                    label: '',
                    field: 'id',
                },
            ])
        );

        return {
            t,
            columnsComputed,
        };
    },
});
</script>

<style scoped></style>
