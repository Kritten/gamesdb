import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/modules/app/login/login.vue';
import ViewApp from '@/modules/app/app.view.vue';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view.vue';
import ViewGames from '@/modules/game/views/games.view.vue';
import ViewGame from '@/modules/game/views/game.view.vue';
import ViewCategory from '@/modules/category/category.view.vue';
import ViewMechanism from '@/modules/mechanism/mechanism.view.vue';
import ViewMood from '@/modules/mood/mood.view.vue';
import ViewPlayer from '@/modules/player/player.view.vue';
import ViewImage from '@/modules/image/image.view.vue';
import ViewUniverse from '@/modules/universe/universe.view.vue';
import ViewRating from '@/modules/rating/rating.view.vue';
import { queue } from '@/queue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: ViewApp,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: ViewDashboard,
      },
      {
        path: 'games',
        name: 'games',
        component: ViewGames,
      },
      {
        path: 'games/:id',
        name: 'game',
        component: ViewGame,
      },
      {
        path: 'categories',
        name: 'categories',
        component: ViewCategory,
      },
      {
        path: 'mechanisms',
        name: 'mechanisms',
        component: ViewMechanism,
      },
      {
        path: 'moods',
        name: 'moods',
        component: ViewMood,
      },
      {
        path: 'players',
        name: 'players',
        component: ViewPlayer,
      },
      {
        path: 'images',
        name: 'images',
        component: ViewImage,
      },
      {
        path: 'universes',
        name: 'universes',
        component: ViewUniverse,
      },
      {
        path: 'ratings',
        name: 'ratings',
        component: ViewRating,
      },
    ],
  },
];
// @ts-ignore
export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

queue.listen('graphqlError', () => {
  if (router.currentRoute.value.name !== 'login') {
    router
      .push({
        name: 'login',
      })
      .then();
  }
});
