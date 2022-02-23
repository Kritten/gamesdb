import { computed, Ref, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { DocumentNode } from 'graphql';
import {
    InputCollection,
    InputCollectionData,
    ServiceCollectionFilters,
    ServiceCollectionLoadPageType,
} from '@/modules/app/utilities/collection/collection.types';
import { query } from '@/boot/apollo';
import { log } from '@/modules/app/utilities/log';

/**
 * Used for paginated data loading
 * @param {function(data: InputCollection, payload: unknown): Object} loadPage - requests and returns the data
 * @param {Object} data
 * @param {Partial<InputCollectionData>} data.inputCollectionData
 * @param {unknown} data.payload
 * @param {boolean} data.immediate
 * @param {boolean} data.watchFilters
 * @param {boolean} data.prependValues
 * @param {function(): boolean} data.hasNextPage
 */
export function useCollection<T>(
    loadPage: ServiceCollectionLoadPageType<T>,
    {
        inputCollectionData = {},
        payload,
        immediate = true,
        watchFilters = true,
        prependValues = false,
        hasNextPage: hasNextPagePassed,
    }: {
        inputCollectionData?: Partial<InputCollectionData>;
        payload?: Record<string, unknown>;
        immediate?: boolean;
        watchFilters?: boolean;
        prependValues?: boolean;
        hasNextPage?: ({
            items,
            countItems,
            page,
            isLoading,
        }: {
            items: Ref<T[]>;
            countItems: Ref<number>;
            page: Ref<number>;
            isLoading: Ref<boolean>;
        }) => boolean;
    } = {}
) {
    const {
        page = 1,
        count = 10,
        sortBy = ref(['entity.name']),
        sortDesc = ref([false]),
        filters = ref<ServiceCollectionFilters>({}),
        leftJoins = [],
    } = inputCollectionData;

    const items = ref<T[]>([]);
    const countItems = ref(-1);
    const isLoading = ref(false);
    const pageRef = ref<number>(page);
    // const sortByRef = ref<string[]>(sortBy);
    // const orderByRef = ref<boolean[]>(sortDesc);
    let counterRequests = 0;

    let hasNextPage;
    if (hasNextPagePassed !== undefined) {
        hasNextPage = computed(() =>
            hasNextPagePassed({
                // @ts-ignore
                items,
                countItems,
                page: pageRef,
                isLoading,
            })
        );
    } else {
        hasNextPage = computed(() => countItems.value !== items.value.length);
    }

    const loadNextItemsInternal = async (
        counter: number,
        addToExistingItems: boolean
    ) => {
        isLoading.value = true;

        const response = await loadPage(
            {
                page: pageRef.value,
                count,
                sortBy: sortBy.value,
                sortDesc: sortDesc.value,
                // TODO kann dann mit vuetify weg
                filters: Object.values(filters.value).map((filter) => {
                    const filterNew = { ...filter };
                    if (typeof filter.valueBoolean === 'number') {
                        filterNew.valueBoolean = undefined;
                    }

                    if (filter.valueEntity !== undefined) {
                        // Wenn der Filter aus mehreren Werten besteht
                        if (Array.isArray(filter.valueEntity)) {
                            // Setze den Filter nur wenn es auch was zu Filtern gibt
                            if (filter.valueEntity.length > 0) {
                                filterNew.valueString = filter.valueEntity
                                    .map((entity) => entity.id)
                                    .join(',');
                                filterNew.operator = 'in';
                            }
                        } else {
                            filterNew.valueString = filter.valueEntity.id;
                        }
                        delete filterNew.valueEntity;
                    }

                    return filterNew;
                }),
                leftJoins,
            },
            payload
        );

        // Check if it's still the most recent request
        if (counter < counterRequests) {
            return undefined;
        }

        countItems.value = response.count;
        if (addToExistingItems === true) {
            if (prependValues) {
                // @ts-ignore
                items.value = response.items.concat(items.value);
            } else {
                // @ts-ignore
                items.value = items.value.concat(response.items);
            }
        }
        pageRef.value += 1;

        isLoading.value = false;

        return response;
    };

    const loadNextItems = async ({
        addToExistingItems = true,
    }: { addToExistingItems?: boolean } = {}) => {
        counterRequests += 1;
        return loadNextItemsInternal(counterRequests, addToExistingItems);
    };

    const reset = async () => {
        items.value = [];
        countItems.value = -1;
        pageRef.value = 1;
        await loadNextItems();
    };

    const resetDebounced = debounce(() => {
        void reset();
    }, 500);

    if (watchFilters) {
        watch(
            filters,
            () => {
                log.error('CALLED WATCH FILTERS, check if used');
                resetDebounced();
            },
            { deep: true }
        );
    }

    watch(
        sortBy,
        () => {
            void reset();
        },
        { deep: true }
    );

    watch(
        sortDesc,
        () => {
            void reset();
        },
        { deep: true }
    );

    if (immediate) {
        void loadNextItems();
    }

    return {
        items,
        countItems,
        hasNextPage,
        isLoading,
        loadNextItems,
        reset,
        resetDebounced,
    };
}

export async function loadPageBase<T, R>({
    data,
    query: queryPassed,
    parseResult,
    after,
}: {
    data: InputCollection;
    query: DocumentNode;
    parseResult: (response: R) => Promise<{ items: T[]; count: number }>;
    after?: ({ items, count }: { items: T[]; count: number }) => void;
}) {
    const response = await query<R>(queryPassed, data);

    const { items, count: countItems } = await parseResult(response);

    if (after !== undefined) {
        after({ items, count: countItems });
    }

    return {
        count: countItems,
        items,
    };
}
