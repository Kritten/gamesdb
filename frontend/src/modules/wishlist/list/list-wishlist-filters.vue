<template>
    <div class="row">
        <div class="col">
            <q-card>
                <q-card-section>
                    <div class="row items-center">
                        <slot>
                            <div class="text-h6">
                                {{ t('filter.label', 2) }}
                            </div>
                        </slot>
                        <div class="col" />
                        <div class="col-shrink">
                            <q-btn
                                flat
                                :label="
                                    $q.screen.gt.xs
                                        ? `${t('filter.reset')}`
                                        : undefined
                                "
                                icon="fas fa-undo"
                                padding="none md"
                                color="primary"
                                @click="$emit('reset')"
                            />
                        </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="wishlist.filters.name"
                                name="entity.name"
                                type="string"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>

                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                :items="itemsGiftFor"
                                :options="{
                                    mapOptions: true,
                                    emitValue: true,
                                }"
                                label="wishlist.filters.giftFor"
                                name="entity.giftFor"
                                type="select"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="wishlist.filters.price"
                                name="entity.price"
                                type="range"
                                :options="{
                                    min: 0,
                                    max: 100,
                                    leftLabelValue: `${filters['entity.price'].valueRange[0]}€`,
                                    rightLabelValue:
                                        filters['entity.price']
                                            .valueRange[1] === 100
                                            ? 'unbegrenzt'
                                            : `${filters['entity.price'].valueRange[1]}€`,
                                }"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>

                        <div class="col-12 col-md-6">
                            <base-list-filter
                                :filters="filters"
                                label="wishlist.filters.taken"
                                name="entity.taken"
                                type="boolean"
                                @update-filter="$emit('update-filter', $event)"
                            />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseListFilter from '@/modules/app/base/base-list-filter.vue';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';

export default defineComponent({
    name: 'ListWishlistFilters',
    components: { BaseListFilter },
    props: {
        modelValue: {
            required: true,
            type: Object,
        },
    },
    emits: ['reset', 'update-filter'],
    setup(props) {
        const { t } = useI18n();

        return {
            t,
            i18nPrefix: 'game',
            filters: computed(() => props.modelValue),
            itemsGiftFor: [
                { value: -1, label: t('common.undefined') },
                ...ServiceWishlist.getItemsGiftFor(),
            ],
        };
    },
});
</script>

<style
    scoped
    lang="scss"
></style>
