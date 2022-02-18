<template>
    <span v-if="value > 0">{{ t(`wishlist.priceRange`, [value]) }}</span>
    <span v-else>{{ t(`wishlist.priceRangeUnknown`) }}</span>
    <!--  <span>{{ t(`wishlist.priceRange.${value}`) }}</span>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'DisplayPriceRange',
    props: {
        value: {
            required: true,
            type: Number,
        },
    },
    setup() {
        const { t } = useI18n();

        return {
            t,
        };
    },
});
</script>

<style scoped></style>
