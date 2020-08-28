<template>
  <ul>
    <router-link
      v-for="route in routes"
      :key="route.label"
      :to="{ name: route.name }"
    >
      <li>
        {{ route.label }}
      </li>
    </router-link>
  </ul>
  <template v-if="store.state.user !== null">
    <router-view />
  </template>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default {
  name: 'ViewApp',
  setup() {
    const { t } = useI18n();
    const store = useStore();

    const routes = [
      {
        label: t('dashboard.label'),
        name: 'dashboard',
      },
      {
        label: t('game.label', 2),
        name: 'games',
      },
      {
        label: t('category.label', 2),
        name: 'categories',
      },
      {
        label: t('mechanism.label', 2),
        name: 'mechanisms',
      },
      {
        label: t('mood.label', 2),
        name: 'moods',
      },
      {
        label: t('universe.label', 2),
        name: 'universes',
      },
      {
        label: t('player.label', 2),
        name: 'players',
      },
      {
        label: t('image.label', 2),
        name: 'images',
      },
      {
        label: t('rating.label', 2),
        name: 'ratings',
      },
    ];

    return {
      t,
      store,
      routes,
    };
  },
};
</script>

<style scoped></style>
