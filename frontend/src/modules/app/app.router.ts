import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/modules/app/login/login.vue';
import ViewApp from '@/modules/app/app.view.vue';
import ViewDashboard from '@/modules/app/dashboard/dashboard.view.vue';
import ViewGames from '@/modules/game/views/games.view.vue';
import ViewGamesDigital from '@/modules/game/views/gamesDigital.view.vue';
import ViewGame from '@/modules/game/views/game.view.vue';
import ViewCategory from '@/modules/category/category.view.vue';
import ViewMechanism from '@/modules/mechanism/mechanism.view.vue';
import ViewMood from '@/modules/mood/mood.view.vue';
import ViewPlayer from '@/modules/player/player.view.vue';
import ViewImage from '@/modules/image/image.view.vue';
import ViewUniverse from '@/modules/universe/universe.view.vue';
import ViewRating from '@/modules/rating/rating.view.vue';
import ViewWishlist from '@/modules/wishlist/wishlist.view.vue';
import ViewDisplayWishlist from '@/modules/wishlist/display-wishlist.view.vue';
import { queue } from '@/queue';
import { store, UserState } from '@/modules/app/app.store';
import { watch } from 'vue';
import { User } from '@/modules/user/user.model';
import { ServiceApp } from '@/modules/app/app.service';

const waitForUser = (callback: (user: UserState) => void) => {
  if (store.state.user === undefined) {
    const stopHandle = watch(
      () => store.state.user,
      (user: UserState | undefined) => {
        stopHandle();

        callback(user as UserState);
      },
    );
  } else {
    callback(store.state.user);
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: {},
    beforeEnter: (to, from, next) => {
      // redirect the user to the wishlist if he is not logged in, otherwise to the dashboard
      waitForUser((user: User | null) => {
        if (user === null) {
          router.push({ name: 'login' });
        } else {
          router.push({ name: 'dashboard' });
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
      if (store.state.user !== undefined && store.state.user !== null) {
        router.push({ name: 'dashboard' });
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
    path: '/',
    name: 'authenticated',
    component: ViewApp,
    beforeEnter: (to, from, next) => {
      // redirect the user to home if he is not logged in
      waitForUser((user: User | null) => {
        if (user === null) {
          router.push({ name: 'home' });
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
      {
        path: '/wishlist-edit',
        name: 'wishlist',
        component: ViewWishlist,
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
  ServiceApp.setCurrentUser(null).then(() => {
    if (router.currentRoute.value.matched[0]?.name === 'authenticated') {
      router
        .push({
          name: 'login',
        })
        .then();
    }
  });
});
