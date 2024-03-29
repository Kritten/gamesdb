import { computed } from 'vue';

import { ErrorObject } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

type TypePropsSingle = Entity | number | string | boolean | Date;
type TypeProps = TypePropsSingle | Array<TypePropsSingle>;

export type EmitFunction = (event: string, ...args: unknown[]) => void;

export function useModelWrapper<T extends TypeProps>({
    props,
    emit,
    name = 'modelValue',
    isEntity = false,
    entities = {},
    parse = (value) => value,
}: {
    props: { [key: string]: Entity | Entity[] | unknown };
    // TODO any ist hier notwendig weil string irgendwie nicht funktioniert
    emit: EmitFunction;
    name?: string;
    isEntity?: boolean;
    entities?: { [key: string]: unknown };
    parse?: (value: unknown) => unknown;
}) {
    return computed<T>({
        get: () => {
            if (isEntity === true) {
                if (Array.isArray(props[name])) {
                    return (props[name] as Array<Entity>).map(
                        (entity: Entity) => entity.id
                    ) as T;
                }
                return (props[name] as Entity)?.id as T;
            }
            return props[name] as T;
        },
        set: (value) => {
            if (isEntity === true) {
                if (Array.isArray(value)) {
                    emit(`update:${name}`, value);
                } else {
                    emit(`update:${name}`, entities[value as string]);
                }
            } else {
                emit(`update:${name}`, parse(value));
            }
        },
    });
}

export const translate = (
    errorObject: ErrorObject,
    t: (value: string) => string
) => ({
    ...errorObject,
    $message: t(`validator.${errorObject.$validator}`),
});

export function toNumber(value: string): number | string {
    const n = parseFloat(value);
    return Number.isNaN(n) ? value : n;
}

export function setDefaultIfNullOrUndefined<T>(
    value: T | undefined,
    defaultValue: T
): T {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    return value;
}

const FUNCTIONS_TYPE = [
    { type: 'string', func: (value: unknown) => typeof value === 'string' },
    { type: 'number', func: (value: unknown) => typeof value === 'number' },
    { type: 'boolean', func: (value: unknown) => typeof value === 'boolean' },
    { type: 'null', func: (value: unknown) => value === null },
    { type: 'undefined', func: (value: unknown) => value === undefined },
    {
        type: 'object',
        func: (value: unknown) =>
            Object.prototype.toString.call(value) === '[object Object]',
    },
    { type: 'array', func: (value: unknown) => Array.isArray(value) },
];

export function getValidator(types: {
    string?: boolean;
    number?: boolean;
    boolean?: boolean;
    object?: boolean;
    null?: boolean;
    undefined?: boolean;
    array?: boolean;
}): (value: unknown) => boolean {
    const validations = FUNCTIONS_TYPE.reduce((arr, value) => {
        if (types[value.type as never] === true) {
            arr.push(value.func);
        }
        return arr;
    }, [] as ((value: unknown) => boolean)[]);

    return (value) => validations.some((func) => func(value));
}

let idInternal = 0;

export function useId(): { generate: () => number } {
    return {
        generate() {
            const id = idInternal;
            idInternal += 1;
            return id;
        },
    };
}

export const displayIsCoop = (isCoop: boolean) => {
    const { t } = useI18n();
    return isCoop ? t('common.yes') : t('common.no');
};
