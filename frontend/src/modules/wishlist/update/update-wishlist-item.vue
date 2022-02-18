<template>
    <base-entity-update
        :entity="wishlistItem"
        i18n-prefix="wishlist"
        :use-update-entity="useUpdateEntity"
        :validation-rules="validationRules"
        :options-button="{ label: undefined }"
        @submit="$emit('updated')"
    >
        <template #item="{ entity, validation }">
            <item-wishlist
                v-model:name="entity.value.name"
                v-model:price="entity.value.price"
                v-model:taken="entity.value.taken"
                v-model:description="entity.value.description"
                v-model:link="entity.value.link"
                v-model:images="entity.value.images"
                v-model:gift-for="entity.value.giftFor"
                :validation="validation"
                :hide-taken="true"
            />
        </template>
    </base-entity-update>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';
import { useUpdateWishlist } from '@/modules/wishlist/composables/useUpdateWishlist';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';

export default defineComponent({
    name: 'UpdateWishlistItem',
    components: { BaseEntityUpdate, ItemWishlist },
    props: {
        wishlistItem: {
            required: true,
            type: Wishlist,
        },
    },
    emits: ['updated'],
    setup() {
        const { t } = useI18n();

        const validationRules = {};

        return {
            t,
            useUpdateEntity: useUpdateWishlist,
            validationRules,
        };
    },
});
</script>

<style scoped></style>
