import { RouteConfig, createRouter, createWebHistory } from 'vue-router';
import Login from '@/modules/app/login/login';
import ViewApp from '@/modules/app/app.view';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view';
import ViewGames from '@/modules/game/views/games.view.vue';
import ViewGame from '@/modules/game/views/game.view.vue';
import ViewCategory from '@/modules/category/category.view';
import ViewMechanism from '@/modules/mechanism/mechanism.view';
import ViewMood from '@/modules/mood/mood.view';
import ViewPlayer from '@/modules/player/player.view';
import ViewImage from '@/modules/image/image.view';
import ViewUniverse from '@/modules/universe/universe.view';
import ViewRating from '@/modules/rating/rating.view';
import { queue } from '@/queue';

const routes: Array<RouteConfig> = [
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

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

queue.listen('graphqlError', () => {
  if (router.currentRoute.value.name !== 'login') {
    router.push({
      name: 'login',
    });
  }
});
