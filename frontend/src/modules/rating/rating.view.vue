<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-entity-header-info
        i18n-prefix="rating"
        :count="countTotal"
        :validation-rules="validationRules"
        :use-create-entity="useCreateEntity"
      >
        <template #item="{ entity, validation }">
          <item-rating
            v-model:player="entity.value.player"
            v-model:game="entity.value.game"
            v-model:rating="entity.value.rating"
            :validation="validation"
          />
        </template>
      </base-entity-header-info>
    </div>
    <div class="col-12">
      <list-ratings />
    </div>
  </div>
</template>

<script lang="ts">
import ListRatings from '@/modules/rating/list/list-ratings.vue';
import { defineComponent } from 'vue';
import BaseEntityHeaderInfo from '@/modules/app/base/entity/base-entity-header-info.vue';
import ItemRating from '@/modules/rating/item-rating.vue';
import { useI18n } from 'vue-i18n';
import { useRating } from '@/modules/rating/composables/useRating';
import { useCreateRating } from '@/modules/rating/composables/useCreateRating';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'ViewRating',
  components: { ItemRating, BaseEntityHeaderInfo, ListRatings },
  setup() {
    const { t } = useI18n();
    const { countTotal } = useRating();

    const validationRules = {
      player: {
        required,
      },
      game: {
        required,
      },
      rating: {
        required,
      },
    };

    return {
      t,
      countTotal,
      validationRules,
      useCreateEntity: useCreateRating,
    };
  },
});
</script>

<style scoped></style>
