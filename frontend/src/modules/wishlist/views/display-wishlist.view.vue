<template>
    <q-layout>
        <q-page-container class="full-height q-pa-md">
            <div class="row justify-center">
                <div
                    id="wrapper"
                    class="col"
                >
                    <div class="row">
                        <div class="col">
                            <i18n-t keypath="wishlist.headerInfo">
                                <template #header>
                                    <div class="text-h3 q-mb-lg">
                                        {{ t('wishlist.headerInfoHeader') }}
                                    </div>
                                </template>
                                <template #disclaimer>
                                    <p>
                                        {{ t('wishlist.headerInfoDisclaimer') }}
                                    </p>
                                </template>
                                <template #content>
                                    <p>{{ t('wishlist.headerInfoContent') }}</p>
                                </template>
                                <template #return>
                                    <p>{{ t('wishlist.headerInfoReturn') }}</p>
                                </template>
                                <template #classics>
                                    <p>
                                        {{ t('wishlist.headerInfoClassics') }}
                                    </p>
                                </template>
                                <template #nogos>
                                    <p style="color: #f56c6c">
                                        {{ t('wishlist.headerInfoNogos') }}
                                    </p>
                                </template>
                            </i18n-t>
                        </div>
                    </div>

                    <div class="row">
                        <list-wishlist :filters="filters">
                            <template #items="{ wishlistItems }">
                                <div
                                    v-for="wishlistItem in wishlistItems"
                                    :key="wishlistItem.id"
                                    class="col-12 col-md-6"
                                >
                                    <list-wishlist-item-extern
                                        :wishlist-item="wishlistItem"
                                    />
                                </div>
                            </template>
                        </list-wishlist>
                    </div>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';
import ListWishlistItemExtern from '@/modules/wishlist/list/list-wishlist-item-extern.vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
    name: 'ViewDisplayWishlist',
    components: { ListWishlistItemExtern, ListWishlist },
    setup() {
        const { t } = useI18n();
        return {
            t,
            filters(
                filters: ServiceCollectionFilters
            ): ServiceCollectionFilters {
                return {
                    ...filters,
                    'entity.taken': {
                        field: 'entity.taken',
                        valueBoolean: false,
                        operator: '=',
                    },
                };
            },
        };
    },
});
</script>

<style
    scoped
    lang="scss"
>
#wrapper {
    max-width: 900px;
}
</style>
