<template>
  <el-container>
    <el-header>
      <a
        href="#"
        @click="logoutService.logout"
      >{{ t('common.logout') }}</a>
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
    </el-header>
    <el-main>
      <template v-if="store.state.user !== undefined">
        <router-view />
      </template>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
import { ServiceLogin } from '@/modules/app/login/login.service';

export default defineComponent({
  name: 'ViewApp',
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const logoutService = ServiceLogin.useLogout();

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
        label: t('game.digital.label', 2),
        name: 'gamesDigital',
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
      {
        label: t('wishlist.label'),
        name: 'wishlist',
      },
    ];

    return {
      t,
      store,
      routes,
      logoutService,
    };
  },
});
</script>

<style scoped></style>
