<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="10">
          <el-button
            :icon="isCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            type="text"
            @click="isCollapsed = !isCollapsed"
          />
        </el-col>
        <el-col :span="14">
          <el-link
            href="#"
            :underline="false"
            @click="logoutService.logout"
          >
            {{ t('common.logout') }}
          </el-link>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside
        v-if="isCollapsed"
        :width="null"
      >
        <el-menu
          router
        >
          <el-menu-item
            v-for="route in routes"
            :key="route.label"
            :index="route.name"
            :route="{name: route.name}"
          >
            <i :class="route.icon" />
            <template #title>
              {{ route.label }}
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <template v-if="store.state.user !== undefined">
          <router-view />
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { defineComponent, ref } from 'vue';
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
      isCollapsed: ref(false),
    };
  },
});
</script>

<style scoped></style>
