import { RouteConfig, createRouter, createWebHistory } from 'vue-router';
import Login from '@/modules/app/login/login';
import ViewApp from '@/modules/app/app.view';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view';
import ViewGame from '@/modules/game/game.view';
import ViewCategory from '@/modules/category/category.view';
import ViewMechanism from '@/modules/mechanism/mechanism.view';
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
