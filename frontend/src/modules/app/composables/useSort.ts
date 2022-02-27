import { ref, Ref } from 'vue';
import { cloneDeep } from 'lodash';

type Sort = {
    sortBy: Array<string>;
    sortDesc: Array<boolean>;
};
type SortRef = {
    sortBy: Ref<Array<string>>;
    sortDesc: Ref<Array<boolean>>;
};

const mapSort = new Map<string, SortRef>();
const mapSortInitial = new Map<string, Sort>();

export const useSort = ({
    key,
    initial = { sortBy: [], sortDesc: [] },
}: {
    key: string;
    initial?: Sort;
}) => {
    if (mapSort.has(key) === false) {
        mapSort.set(key, {
            sortBy: ref(initial.sortBy),
            sortDesc: ref(initial.sortDesc),
        });
        mapSortInitial.set(key, cloneDeep(initial));
    }

    return {
        getSort: () => {
            const sort = mapSort.get(key);

            if (sort === undefined) {
                throw Error();
            }

            return sort;
        },
        // resetSort: () => {
        //     const sort = mapSort.get(key);
        //     const sortInitial = mapSortInitial.get(key);

        //     if (sort === undefined || sortInitial === undefined) {
        //         throw Error();
        //     }

        //     // sort.value = cloneDeep(sortInitial);
        // },
    };
};
