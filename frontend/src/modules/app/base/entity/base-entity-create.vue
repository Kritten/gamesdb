<template>
    <base-dialog
        :title="`${t(`${i18nPrefix}.label`)} ${t('common.create')}`"
        :text-submit="t('common.create')"
        :options-button="optionsButtonMerged"
        :validation="validation"
        @submit="submit"
    >
        <slot
            name="item"
            :entity="createEntity.entity"
            :validation="validation"
        />

        <template #buttons="props">
            <slot
                name="buttons"
                :entity="createEntity.entity"
                :validation="validation"
                v-bind="props"
            />
        </template>
    </base-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export default defineComponent({
    name: 'BaseEntityCreate',
    components: { BaseDialog },
    props: {
        i18nPrefix: {
            required: true,
            type: String,
        },
        useCreateEntity: {
            required: true,
            type: Function as PropType<
                ({
                    valuesInitial,
                }: {
                    valuesInitial?: Record<string, unknown>;
                }) => {
                    entity: Ref<Entity>;
                    create: () => Promise<Entity>;
                }
            >,
        },
        validationRules: {
            required: false,
            type: Object,
            default: () => ({}),
        },
        optionsButton: {
            required: false,
            type: Object,
            default: () => ({}),
        },
        valuesInitial: {
            required: false,
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const { t } = useI18n();

        const createEntity = props.useCreateEntity({
            valuesInitial: props.valuesInitial,
        });

        const validation = useVuelidate(
            computed(() => props.validationRules),
            createEntity.entity as unknown as Ref<Record<string, unknown>>,
            { $stopPropagation: true }
        );

        return {
            t,
            validation,
            createEntity,
            async submit(close: () => void) {
                await createEntity.create();
                close();
                emit('submit', close);
            },
            optionsButtonMerged: computed(() => ({
                label: `${t(`${props.i18nPrefix}.label`)} ${t(
                    'common.create'
                )}`,
                color: 'primary',
                icon: 'fa fa-plus',
                ...props.optionsButton,
            })),
        };
    },
});
</script>

<style scoped></style>
