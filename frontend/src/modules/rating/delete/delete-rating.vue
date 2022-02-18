<template>
    <base-entity-delete
        :entity="rating"
        i18n-prefix="rating"
        :use-delete-entity="useDeleteRating"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Rating } from '@/modules/rating/rating.model';
import { useDeleteRating } from '@/modules/rating/composables/useDeleteRating';
import BaseEntityDelete from '@/modules/app/base/entity/base-entity-delete.vue';

export default defineComponent({
    name: 'DeleteRating',
    components: { BaseEntityDelete },
    props: {
        rating: {
            required: true,
            type: Rating,
        },
    },
    setup() {
        return {
            useDeleteRating,
        };
    },
});
</script>

<style scoped></style>
