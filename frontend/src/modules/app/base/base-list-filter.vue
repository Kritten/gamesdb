<template>
    <div class="row">
        <div class="col">
            <slot>
                <template v-if="type === 'string'">
                    <base-input-text
                        v-model="value"
                        :options="{
                            label: t(label),
                            ...options,
                        }"
                    />
                </template>
                <template v-else-if="type === 'int' || type === 'float'">
                    <base-input-number
                        v-model="value"
                        :options="{
                            label: t(label),
                            ...options,
                        }"
                    />
                </template>
                <template v-else-if="type === 'boolean'">
                    <base-input-boolean
                        v-model="value"
                        :can-be-undefined="true"
                        :options="{
                            label: t(label),
                            ...options,
                        }"
                    />
                </template>
                <template v-else-if="type === 'select'">
                    <base-input-select
                        v-model="value"
                        :options="{
                            label: t(label),
                            ...options,
                            items,
                        }"
                    />
                </template>
                <template v-else-if="type === 'range'">
                    <base-input-range
                        v-model="value"
                        :options="{
                            label: t(label),
                            ...options,
                        }"
                    />
                </template>
                <template v-else-if="type === 'entity'">
                    <component
                        :is="input"
                        v-model="value"
                        :options="{
                            label: t(label),
                            ...options,
                            multiple: true,
                        }"
                    />
                </template>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    watch,
    nextTick,
    computed,
    PropType,
    Component,
} from 'vue';
import { useI18n } from 'vue-i18n';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import { toNumber } from '@/modules/app/utilities/helpers';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import BaseInputRange from '@/modules/app/base/inputs/base-input-range.vue';
import {
    InputCollectionFilter,
    ServiceCollectionFilters,
} from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
    name: 'BaseListFilter',
    components: {
        BaseInputRange,
        BaseInputSelect,
        BaseInputBoolean,
        BaseInputNumber,
        BaseInputText,
    },
    props: {
        filters: {
            required: true,
            type: Object as PropType<ServiceCollectionFilters>,
        },
        name: {
            required: true,
            type: String,
        },
        type: {
            required: true,
            type: String as PropType<
                | 'string'
                | 'int'
                | 'float'
                | 'boolean'
                | 'select'
                | 'range'
                | 'entity'
            >,
        },
        label: {
            required: true,
            type: String,
        },
        operator: {
            required: false,
            type: String,
            default: undefined,
        },
        filterInputs: {
            required: false,
            type: Array as PropType<Array<{ name: string; operator: string }>>,
            default: undefined,
        },
        items: {
            required: false,
            type: Array as PropType<Array<unknown>>,
            default: () => [],
        },
        input: {
            type: Object as PropType<Component>,
            required: false,
            default: undefined,
        },
        options: {
            required: false,
            type: Object as PropType<Record<string, unknown>>,
            default: () => ({}),
        },
    },
    emits: ['update-filter'],
    setup(props, { emit }) {
        const { t } = useI18n();

        let nameValueField: keyof InputCollectionFilter;
        // @ts-ignore
        let nameField: string[] = [props.name];
        let operator: string[] = [];

        // @ts-ignore
        switch (props.type) {
            case 'string':
                nameValueField = 'valueString';
                operator.push('like');
                break;
            case 'int':
                nameValueField = 'valueInt';
                operator.push('=');
                break;
            case 'float':
                nameValueField = 'valueFloat';
                operator.push('=');
                break;
            case 'boolean':
                nameValueField = 'valueBoolean';
                operator.push('=');
                break;
            case 'select':
                nameValueField = 'valueInt';
                operator.push('=');
                break;
            case 'range':
                nameValueField = 'valueRange';
                operator.push('between');
                break;
            case 'entity':
                nameValueField = 'valueEntity';
                operator.push('=');
                break;
            default:
                throw Error('Unknown filter type');
        }

        watch(
            () => props.operator,
            (value) => {
                // @ts-ignore
                if (value !== undefined) {
                    // @ts-ignore
                    operator[0] = value;
                }
            },
            { immediate: true }
        );

        if (props.filterInputs !== undefined) {
            nameField = props.filterInputs.map((filter) => filter.name);
            operator = props.filterInputs.map((filter) => filter.operator);
        }

        const emitValue = (valueNew: unknown) => {
            // @ts-ignore
            if (props.type === 'select') {
                valueNew = toNumber(valueNew as string);
            }

            const payload: { [key: string]: Record<string, unknown> } = {};

            for (let i = 0; i < operator.length; i += 1) {
                payload[nameField[i]] = {
                    // @ts-ignore
                    field: nameField[i],
                    [nameValueField]: valueNew,
                    operator: operator[i],
                };
            }

            emit('update-filter', payload);
        };

        const value = computed({
            get() {
                const filter = props.filters[nameField[0]];
                return filter === undefined
                    ? undefined
                    : filter[nameValueField];
            },
            set(valueNew) {
                if (typeof valueNew === 'string') {
                    if (valueNew.trim() === '') {
                        emitValue(undefined);
                        return;
                    }
                }
                if (valueNew === null) {
                    emitValue(undefined);
                    return;
                }
                emitValue(valueNew);
            },
        });

        /**
         * Execute everytime the current filter changes to check if it has to be initialized
         */
        // @ts-ignore
        watch(
            () => props.filters[nameField[0]],
            () => {
                // @ts-ignore
                if (props.filters[nameField[0]] === undefined) {
                    void nextTick(() => {
                        emitValue(undefined);
                    });
                }
            },
            { deep: true, immediate: true }
        );

        return {
            t,
            value,
        };
    },
});
</script>

<style scoped></style>
