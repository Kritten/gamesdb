<template>
  <base-entity-update
    :entity="rating"
    i18n-prefix="rating"
    :use-update-entity="useUpdateRating"
    :validation-rules="validationRules"
    :options-button="{ label: undefined }"
  >
    <template #item="{ entity, validation }">
      <item-rating
        v-model:player="entity.value.player"
        v-model:game="entity.value.game"
        v-model:rating="entity.value.rating"
        :validation="validation"
      />
    </template>
  </base-entity-update>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { Rating } from '@/modules/rating/rating.model';
import { defineComponent } from 'vue';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import ItemRating from '@/modules/rating/item-rating.vue';
import { useUpdateRating } from '@/modules/rating/composables/useUpdateRating';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'UpdateRating',
  components: { ItemRating, BaseEntityUpdate },
  props: {
    rating: {
      required: true,
      type: Rating,
    },
  },
  setup() {
    const { t } = useI18n();

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
      validationRules,
      useUpdateRating,
    };
  },
});
</script>

<style scoped>

</style>
