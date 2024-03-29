<template>
    <base-dialog
        :title="`${t(`${i18nPrefix}.label`)} ${t('common.edit')}`"
        :text-submit="t('common.edit')"
        :options-button="optionsButtonMerged"
        :validation="validation"
        @submit="submit"
    >
        <slot
            name="item"
            :entity="updateEntity.entity"
            :validation="validation"
        />
    </base-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import BaseDialog from '@/modules/app/base/base-dialog.vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export default defineComponent({
    name: 'BaseEntityUpdate',
    components: { BaseDialog },
    props: {
        i18nPrefix: {
            required: true,
            type: String,
        },
        entity: {
            required: true,
            type: Object as PropType<Entity>,
        },
        useUpdateEntity: {
            required: true,
            type: Function as PropType<
                (entityPassed: Entity) => {
                    entity: Ref<Entity>;
                    update: () => Promise<void>;
                }
            >,
        },
        optionsButton: {
            required: false,
            type: Object,
            default: () => ({}),
        },
        validationRules: {
            required: false,
            type: Object,
            default: () => ({}),
        },
        label: {
            required: false,
            type: [String, Boolean],
            default: undefined,
        },
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const { t } = useI18n();

        const updateEntity = props.useUpdateEntity(props.entity);

        const labelInternal = computed(() => {
            if (props.label === true || props.label === '') {
                return `${t(`${props.i18nPrefix}.label`)} ${t('common.edit')}`;
            }

            if (typeof props.label === 'string') {
                return props.label;
            }

            return undefined;
        });

        const validation = useVuelidate(
            computed(() => props.validationRules),
            updateEntity.entity as unknown as Ref<Record<string, unknown>>,
            { $stopPropagation: true }
        );

        return {
            t,
            validation,
            updateEntity,
            async submit(close: () => void) {
                await updateEntity.update();
                close();
                emit('submit', close);
            },
            optionsButtonMerged: computed(() => ({
                label: labelInternal.value,
                color: 'primary',
                icon: 'fa fa-edit',
                ...props.optionsButton,
            })),
        };
    },
});
</script>

<style scoped></style>
