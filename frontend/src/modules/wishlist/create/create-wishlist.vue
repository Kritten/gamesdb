<template>
    <base-entity-create
        i18n-prefix="wishlist"
        :validation-rules="validationRules"
        :use-create-entity="useCreateEntity"
        :options-button="optionsButton"
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
    </base-entity-create>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';
import BaseEntityCreate from '@/modules/app/base/entity/base-entity-create.vue';
import { useCreateWishlist } from '@/modules/wishlist/composables/useCreateWishlist';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';

export default defineComponent({
    name: 'CreateWishlist',
    components: { BaseEntityCreate, ItemWishlist },
    props: {
        optionsButton: {
            required: false,
            type: Object,
            default: () => ({}),
        },
    },
    setup() {
        const { t } = useI18n();
        const { validation } = useWishlist();

        const validationRules = validation.create();

        return {
            t,
            useCreateEntity: useCreateWishlist,
            validationRules,
        };
    },
});
</script>

<style scoped></style>
