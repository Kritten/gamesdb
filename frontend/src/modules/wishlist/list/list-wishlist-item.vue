<template>
    <div class="col-12 col-md-6 col-lg-4">
        <q-card class="column full-height">
            <q-card-section class="row col-grow">
                <div class="col">
                    <span class="text-h6">
                        {{ wishlist.name }}
                    </span>
                </div>
                <div class="col-shrink">
                    <update-wishlist-item :wishlist-item="wishlist" />
                </div>
            </q-card-section>
            <q-card-section class="row">
                <div class="col-12">
                    <q-carousel
                        v-model="slide"
                        height="15rem"
                        animated
                        infinite
                        :autoplay="autoplay"
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                    >
                        <q-carousel-slide
                            v-for="(image, index) in wishlist.images"
                            :key="index"
                            :name="index"
                        >
                            <q-img
                                :src="image"
                                fit="contain"
                                height="14rem"
                            />
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </q-card-section>

            <q-card-actions
                align="right"
                class="row"
            >
                <div class="col-shrink">
                    <q-btn
                        flat
                        icon="fas fa-eye"
                        color="primary"
                        :label="t('common.details')"
                        :to="{
                            name: 'wishlist-item',
                            params: { id: wishlist.id },
                        }"
                    />
                </div>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import UpdateWishlistItem from '@/modules/wishlist/update/update-wishlist-item.vue';

export default defineComponent({
    name: 'ListWishlistItem',
    components: { UpdateWishlistItem },
    props: {
        wishlist: {
            required: true,
            type: Wishlist,
        },
    },
    setup() {
        const { t } = useI18n();
        const autoplay = ref(true);
        const slide = ref(0);

        return {
            t,
            autoplay,
            slide,
        };
    },
});
</script>

<style scoped></style>
