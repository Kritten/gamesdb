<template>
  <el-col
    :lg="12"
    style="padding-top: 10px; padding-bottom: 10px;"
  >
    <el-card class="list-wishlist-item-extern">
      <!--      :type="wishlistItem.images.length === 1 ? undefined : 'card'"-->
      <!--      :arrow="wishlistItem.images.length === 1 ? 'never' : 'always'"-->
      <el-carousel
        trigger="click"
        indicator-position="none"
        height="200px"
        arrow="never"
      >
        <el-carousel-item
          v-for="image in wishlistItem.images"
          :key="image.id"
        >
          <el-image
            :src="image.link"
            :fit="'contain'"
            style="height: 200px"
          />
        </el-carousel-item>
      </el-carousel>

      <el-row class="row-name">
        <el-col>
          <h2>{{ wishlistItem.name }}</h2>
        </el-col>
      </el-row>

      <el-row class="row-bottom">
        <el-col>
          <el-row class="row-gift-for">
            <el-col>
              <strong>{{ t('wishlist.giftFor') }}: </strong>
              <display-gift-for :value="wishlistItem.giftFor" />
            </el-col>
          </el-row>
          <el-row class="row-price-range">
            <el-col>
              <strong>{{ t('wishlist.price') }}: </strong>
              <display-price-range :value="wishlistItem.price" />
            </el-col>
          </el-row>
          <el-row>
            <el-col
              class="col-info"
              :span="12"
            >
              <el-link
                :underline="false"
                :href="wishlistItem.link"
                icon="el-icon-info"
                target="_blank"
              >
                {{ t('wishlist.buy') }}
              </el-link>
            </el-col>
            <el-col
              class="col-button"
              :span="12"
            >
              <el-button
                v-if="wishlistItem.taken"
                @click="giveBack"
              >
                {{ t('wishlist.giveBack') }}
              </el-button>
              <el-button
                v-else
                type="primary"
                @click="take"
              >
                {{ t('wishlist.take') }}
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref } from 'vue';
import { Wishlist } from '@/modules/wishlist/wishlist.model';
import DisplayGiftFor from '@/modules/wishlist/display/display-gift-for.vue';
import { useI18n } from 'vue-i18n';
import DisplayPriceRange from '@/modules/wishlist/display/display-price-range.vue';
import { ElMessageBox } from 'element-plus';
import { ServiceWishlist } from '@/modules/wishlist/wishlist.service';

export default defineComponent({
  name: 'ListWishlistItemExtern',
  components: { DisplayPriceRange, DisplayGiftFor },
  props: {
    wishlistItem: {
      required: true,
      type: Object as PropType<Wishlist>,
    },
  },
  setup(props) {
    const { t } = useI18n();

    return {
      t,
      take() {
        ElMessageBox.confirm(t('wishlist.confirm.take'), {
          cancelButtonText: t('common.cancel'),
          confirmButtonText: t('common.yes'),
        }).then(() => {
          const wishlistItemEdited = props.wishlistItem as Wishlist;
          wishlistItemEdited.taken = true;
          ServiceWishlist.updateTaken(wishlistItemEdited);
        }).catch(() => {});
      },
      giveBack() {
        ElMessageBox.confirm(t('wishlist.confirm.giveBack'), {
          cancelButtonText: t('common.cancel'),
          confirmButtonText: t('common.yes'),
        }).then(() => {
          const wishlistItemEdited = props.wishlistItem as Wishlist;
          wishlistItemEdited.taken = false;
          ServiceWishlist.updateTaken(wishlistItemEdited);
        }).catch(() => {});
      },
    };
  },
});
</script>

<style scoped></style>
