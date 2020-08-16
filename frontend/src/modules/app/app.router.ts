import { RouteConfig, createRouter, createWebHistory } from 'vue-router';
import Login from '@/modules/app/login/login';
import ViewApp from '@/modules/app/app.view';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view';
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
