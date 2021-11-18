import { RouteRecordRaw } from 'vue-router';
// import { User } from '@/modules/user/user.model';
// import { useUser } from '@/modules/user/composables/useUser';
// import Login from 'src/modules/app/login/login.vue';
import Login from '@/modules/app/login/login.vue';
import { User } from '@/modules/user/user.model';
import ViewDisplayWishlist from '@/modules/wishlist/views/display-wishlist.view.vue';
import ViewApp from '@/modules/app/app.view.vue';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view.vue';
import ViewGames from '@/modules/game/views/games.view.vue';
import ViewDisplayGames from '@/modules/game/views/display-games.view.vue';
import ViewGamesDigital from '@/modules/game/views/gamesDigital.view.vue';
import ViewGame from '@/modules/game/views/game.view.vue';
import ViewCategory from '@/modules/category/category.view.vue';
import ViewMechanism from '@/modules/mechanism/mechanism.view.vue';
import ViewMood from '@/modules/mood/mood.view.vue';
import ViewPlayer from '@/modules/player/player.view.vue';
import ViewUniverse from '@/modules/universe/universe.view.vue';
import ViewRating from '@/modules/rating/rating.view.vue';
import ViewWishlist from '@/modules/wishlist/views/wishlist.view.vue';
import ViewWishlistItem from '@/modules/wishlist/views/wishlist-item.view.vue';
import { useUser } from '@/modules/user/composables/useUser';
import { watch } from 'vue';

// eslint-disable-next-line no-unused-vars
type callbackType = (userPassed: User | null) => void

const { user } = useUser();

const waitForUser = (callback: callbackType) => {
  if (user.value === undefined) {
    const stopHandle = watch(
      user,
      (value: User | null | undefined) => {
        stopHandle();

        callback(value as User | null);
      },
    );
  } else {
    callback(user.value);
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: {},
    beforeEnter: (to, from, next) => {
      // redirect the user to the wishlist if he is not logged in, otherwise to the dashboard
      waitForUser((userPassed: User | null) => {
        if (userPassed === null) {
          next({ name: 'login' });
        } else {
          next({ name: 'dashboard' });
        }
      });
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // redirect the user to the dashboard if he is already logged in
      if (user.value !== undefined && user.value !== null) {
        next({ name: 'dashboard' });
        return;
      }
      next();
    },
  },
  {
    path: '/wishlist',
    name: 'display-wishlist',
    component: ViewDisplayWishlist,
  },
  {
    path: '/gamelist',
    name: 'display-games',
    component: ViewDisplayGames,
  },
  {
    path: '/',
    name: 'authenticated',
    component: ViewApp,
    beforeEnter: (to, from, next) => {
      // redirect the user to home if he is not logged in
      waitForUser((userPassed: User | null) => {
        if (userPassed === null) {
          next({ name: 'home' });
        } else {
          next();
        }
      });
    },
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
        path: 'gamesDigital',
        name: 'gamesDigital',
        component: ViewGamesDigital,
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
        path: 'universes',
        name: 'universes',
        component: ViewUniverse,
      },
      {
        path: 'ratings',
        name: 'ratings',
        component: ViewRating,
      },
      {
        path: '/wishlist-edit',
        name: 'wishlist',
        component: ViewWishlist,
      },
      {
        path: '/wishlist-edit/:id',
        name: 'wishlist-item',
        component: ViewWishlistItem,
      },
    ],
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/Index.vue') }],
  // },
];

export default routes;
