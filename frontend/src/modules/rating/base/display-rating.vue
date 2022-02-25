<template>
    <q-rating
        v-if="rating !== null"
        :model-value="(rating + 1) / 2.0"
        readonly
        :size="dense ? '1rem' : '1.5rem'"
        icon="far fa-star"
        icon-selected="fas fa-star"
        icon-half="fas fa-star-half-alt"
    />
    <span v-else> - </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DisplayRating',
    props: {
        // eslint-disable-next-line vue/require-prop-types
        rating: {
            required: true,
            // type: Number as PropType<number | null>,
        },
        dense: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped></style>
