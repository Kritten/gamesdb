<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-entity-header-info
        i18n-prefix="wishlist"
        :count="countTotal"
        :validation-rules="validationRules"
        :use-create-entity="useCreateEntity"
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
          />
        </template>
      </base-entity-header-info>
    </div>
    <div class="col-12">
      <list-wishlist />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ListWishlist from '@/modules/wishlist/list/list-wishlist.vue';
import BaseEntityHeaderInfo from '@/modules/app/base/entity/base-entity-header-info.vue';
import ItemWishlist from '@/modules/wishlist/item-wishlist.vue';
import { useWishlist } from '@/modules/wishlist/composables/useWishlist';
import { useCreateWishlist } from '@/modules/wishlist/composables/useCreateWishlist';

export default defineComponent({
  name: 'ViewWishlist',
  components: {
    ItemWishlist, BaseEntityHeaderInfo, ListWishlist,
  },
  setup() {
    const { t } = useI18n();
    const { countTotal, validation } = useWishlist();

    const validationRules = validation.create();

    return {
      t,
      countTotal,
      useCreateEntity: useCreateWishlist,
      validationRules,
    };
  },
});
</script>

<style scoped>

</style>
