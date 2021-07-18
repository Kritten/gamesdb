<template>
  <base-entity-create
    i18n-prefix="wishlist"
    :validation-rules="validationRules"
    :use-create-entity="useCreateEntity"
    :options-button="optionsButton"
  >
    <template #item="{ entity, validation }">
      <item-rating
        v-model:rating="value.rating"
        v-model:player="entity.value.player"
        v-model:game="entity.value.game"
        :validation="validation"
      />
    </template>
  </base-entity-create>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import ItemRating from '@/modules/rating/item-rating.vue';
import { defineComponent } from 'vue';
import BaseEntityCreate from '@/modules/app/base/entity/base-entity-create.vue';
import { useCreateRating } from '@/modules/rating/composables/useCreateRating';

export default defineComponent({
  name: 'CreateRating',
  components: { BaseEntityCreate, ItemRating },
  props: {
    optionsButton: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { t } = useI18n();

    return {
      t,
      useCreateEntity: useCreateRating,
      validationRules: {},
    };
  },
});
</script>

<style scoped>

</style>
