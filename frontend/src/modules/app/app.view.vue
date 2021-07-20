<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="isCollapsed = !isCollapsed"
        />

        <q-toolbar-title>
          <!--          <q-avatar>-->
          <!--            <img-->
          <!--              src="@/assets/pwa-192x192.png"-->
          <!--              alt="Logo"-->
          <!--            >-->
          <!--          </q-avatar>-->
          {{ title }}
        </q-toolbar-title>

        <base-dialog
          :title="t('session.virtual.label', 2)"
          :options-button="{
            label: t('session.virtual.label', 2),
            icon: 'fas fa-list'
          }"
          hide-actions
          remove-padding-content
          pull-to-refresh
        >
          <template #default="{ refresh }">
            <list-sessions-virtual :refresh="refresh" />
          </template>
        </base-dialog>

        <q-separator
          dark
          vertical
        />

        <create-session
          :options-button="{
            color: 'white',
          }"
        />

        <q-separator
          dark
          vertical
        />

        <q-btn
          flat
          stretch
          :icon="fasSignOutAlt"
          @click="logoutService.logout"
        >
          <q-tooltip>
            {{ t('common.logout') }}
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isCollapsed"
      show-if-above
      side="left"
      bordered
      :mini="miniState"
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template
            v-for="(route, index) in routes"
            :key="route.label"
          >
            <q-separator
              v-if="route.separator"
              :key="'sep' + index"
            />
            <q-item
              :to="{name: route.name}"
              clickable
              exact
            >
              <q-item-section avatar>
                <q-icon :name="route.icon" />
              </q-item-section>
              <q-item-section>
                {{ route.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container v-if="user !== undefined">
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, defineComponent, ref } from 'vue';
import { ServiceLogin } from '@/modules/app/login/login.service';
import { useUser } from '@/modules/user/composables/useUser';
import {
  fasCogs,
  fasDice,
  fasGamepad,
  fasGift,
  fasGifts, fasGlobeAmericas,
  fasSignOutAlt, fasSmile,
  fasStarHalfAlt,
  fasTachometerAlt,
  fasTags,
  fasUsers,
} from '@quasar/extras/fontawesome-v5';
import CreateSession from '@/modules/session/create/create-session.vue';
import { useRouter } from 'vue-router';
import ListSessionsVirtual from '@/modules/session/list/list-sessions-virtual.vue';
import BaseDialog from '@/modules/app/base/base-dialog.vue';

export default defineComponent({
  name: 'ViewApp',
  components: { BaseDialog, ListSessionsVirtual, CreateSession },
  setup() {
    const { t } = useI18n();
    const { user } = useUser();
    const { currentRoute } = useRouter();
    const logoutService = ServiceLogin.useLogout();

    const routes = [
      {
        label: t('dashboard.label'),
        name: 'dashboard',
        icon: fasTachometerAlt,
      },
      {
        label: t('game.label', 2),
        name: 'games',
        icon: fasDice,
      },
      {
        label: t('game.digital.label', 2),
        name: 'gamesDigital',
        icon: fasGamepad,
      },
      {
        label: t('category.label', 2),
        name: 'categories',
        icon: fasTags,
      },
      {
        label: t('mechanism.label', 2),
        name: 'mechanisms',
        icon: fasCogs,
      },
      {
        label: t('mood.label', 2),
        name: 'moods',
        icon: fasSmile,
      },
      {
        label: t('universe.label', 2),
        name: 'universes',
        icon: fasGlobeAmericas,
      },
      {
        label: t('player.label', 2),
        name: 'players',
        icon: fasUsers,
      },
      {
        label: t('rating.label', 2),
        name: 'ratings',
        icon: fasStarHalfAlt,
      },
      {
        label: t('wishlist.label'),
        name: 'wishlist',
        icon: fasGift,
      },
      {
        label: t('wishlist.extern.label'),
        name: 'display-wishlist',
        icon: fasGifts,
        separator: true,
      },
    ];

    const title = computed(() => routes.find((route) => route.name === currentRoute.value.name)?.label);

    return {
      t,
      user,
      title,
      routes,
      logoutService,
      isCollapsed: ref(false),
      miniState: ref(true),
      fasSignOutAlt,
    };
  },
});
</script>

<style scoped></style>
