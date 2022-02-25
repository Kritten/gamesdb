import { ref, Ref } from 'vue';
import { cloneDeep } from 'lodash';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

const mapFilters = new Map<string, Ref<ServiceCollectionFilters>>();
const mapFiltersInitial = new Map<string, ServiceCollectionFilters>();

export const useFilters = ({
    key,
    initial = {},
}: {
    key: string;
    initial?: ServiceCollectionFilters;
}) => {
    if (mapFilters.has(key) === false) {
        mapFilters.set(key, ref(cloneDeep(initial)));
        mapFiltersInitial.set(key, cloneDeep(initial));
    }

    return {
        getFilters: () => {
            const filters = mapFilters.get(key);

            if (filters === undefined) {
                throw Error();
            }

            return filters;
        },
        resetFilters: () => {
            const filters = mapFilters.get(key);
            const filtersInitial = mapFiltersInitial.get(key);

            if (filters === undefined || filtersInitial === undefined) {
                throw Error();
            }

            filters.value = cloneDeep(filtersInitial);
        },
    };
};
