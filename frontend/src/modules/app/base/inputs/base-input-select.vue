<template>
    <q-select
        ref="qSelect"
        :model-value="modelValue"
        :options="filter === undefined ? itemsInternal : optionsMerged.items"
        :error="baseInput.errorMessage.value !== ''"
        :error-message="baseInput.errorMessage.value"
        v-bind="optionsMerged"
        @update:model-value="baseInput.input"
        @virtual-scroll="onScroll"
        @filter="filterInternal"
    >
        <template
            v-if="hasSlotOption"
            #option="scope"
        >
            <slot
                name="option"
                v-bind="scope"
            />
        </template>

        <template
            v-if="Array.isArray(modelValue)"
            #option="{ itemProps, opt, selected, toggleOption }"
        >
            <q-item v-bind="itemProps">
                <q-item-section side>
                    <q-checkbox
                        :model-value="selected"
                        @update:model-value="toggleOption(opt)"
                    />
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        {{
                            opt[
                                options.optionLabel !== undefined
                                    ? options.optionLabel
                                    : 'label'
                            ]
                        }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { Validation } from '@vuelidate/core';
import { QSelect } from 'quasar';
import { getValidator } from '@/modules/app/utilities/helpers';
import {
    configBaseInput,
    TypeOptionsInputSelect,
    useBaseInput,
} from '@/modules/app/base/inputs/base-input';

export default defineComponent({
    name: 'BaseInputSelect',
    props: {
        modelValue: {
            required: true,
            validator: getValidator({
                number: true,
                string: true,
                boolean: true,
                null: true,
                undefined: true,
                object: true,
                array: true,
            }),
        },
        validation: {
            required: false,
            type: Object as PropType<Validation>,
            default: undefined,
        },
        options: {
            required: false,
            type: Object as PropType<TypeOptionsInputSelect>,
            default: () => ({}),
        },
        onScroll: {
            required: false,
            type: Function,
            default: () => true,
        },
        filter: {
            required: false,
            type: Function,
            default: undefined,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots }) {
        const qSelect = ref<QSelect | null>(null);

        const multiple = Array.isArray(props.modelValue);

        const baseInput = useBaseInput<string, string>(props, emit, (value) => {
            if (value === null && multiple) {
                return [];
            }
            return value;
        });

        const optionsMerged = computed(() => ({
            ...configBaseInput,
            ...props.options,
            label: baseInput.label.value,
            multiple,
        }));

        const itemsInternal = ref<Array<Record<string, unknown>>>(
            optionsMerged.value.items
        );

        let filterInternal = props.filter;
        if (filterInternal === undefined) {
            filterInternal = (
                value: string,
                update: (callback: () => void) => void
            ) => {
                update(() => {
                    const needle = value.toLowerCase();
                    itemsInternal.value = optionsMerged.value.items.filter(
                        (v) =>
                            (
                                v[
                                    optionsMerged.value.optionLabel !==
                                    undefined
                                        ? optionsMerged.value.optionLabel
                                        : 'label'
                                ] as string
                            )
                                .toLowerCase()
                                .indexOf(needle) > -1
                    );
                });
            };
            optionsMerged.value.inputDebounce = 0;
        }

        return {
            baseInput,
            qSelect,
            filterInternal,
            optionsMerged,
            itemsInternal,
            hasSlotOption: slots.option !== undefined,
            refresh() {
                if (qSelect.value !== null) {
                    qSelect.value.refresh();
                }
            },
        };
    },
});
</script>

<style scoped></style>
