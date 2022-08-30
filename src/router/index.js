import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import i18n from '@/locales';
import store from '@/store';
const { global } = i18n;
export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Log In',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: global.t('route.home'),
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
          requiresAuth: true,
        },
      },
      {
        path: '/general-settings/contractors',
        name: 'Contractors',
        component: () => import('@/views/GeneralSettings/Contractor/Index.vue'),
        meta: {
          title: 'General Settings - Contractor',
          icon: 'icon-code',
          requiresAuth: true,
        },
      },
      {
        path: '/general-settings/sectors',
        name: 'Sectors',
        component: () => import('@/views/GeneralSettings/Sector/Index.vue'),
        meta: {
          title: 'General Settings - Sector',
          icon: 'icon-code',
          requiresAuth: true,
        },
      },
      {
        path: '/general-settings/mdas',
        name: 'MDAs',
        component: () => import('@/views/GeneralSettings/Mda/Index.vue'),
        meta: {
          title: 'General Settings - MDA',
          icon: 'icon-like',
          requiresAuth: true,
        },
      },
      {
        path: '/general-settings/states',
        name: 'States',
        component: () => import('@/views/GeneralSettings/State/Index.vue'),
        meta: {
          title: 'General Settings - State',
          icon: 'icon-like',
          requiresAuth: true,
        },
      },
      {
        path: '/general-settings/lgas',
        name: 'Lgas',
        component: () => import('@/views/GeneralSettings/Lga/Index.vue'),
        meta: {
          title: 'General Settings - LGA',
          icon: 'icon-like',
          requiresAuth: true,
        },
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/views/Projects/Index.vue'),
        meta: {
          title: 'Projects',
          icon: 'icon-like',
          requiresAuth: true,
        },
      },
      {
        path: '/lga-budget-amount',
        name: 'Lga Budget Amount',
        component: () => import('@/views/LgaBudgetAmount/Index.vue'),
        meta: {
          title: 'Lga Budget Amount',
          icon: 'icon-like',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      title: global.t('route.errorPages'),
      icon: 'icon-link-cloud-faild',
    },
    children: [
      {
        path: '/404Page',
        name: '404Page',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
          title: global.t('route.page404'),
          icon: 'icon-link-cloud-faild',
        },
      },
      {
        path: '/401Page',
        name: '401Page',
        component: () => import('@/views/errorPage/401.vue'),
        meta: {
          title: global.t('route.page401'),
          icon: 'icon-link-interrupt',
        },
      },
    ],
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  console.log(store.getters['user/accessToken']);
  if (to.meta.requiresAuth === true && store.getters['user/isUserLoggedIn'] === true) {
    next();
  } else if (to.meta.requiresAuth === true && store.getters['user/isUserLoggedIn'] === false) {
    next({ path: '/login' });
  } else {
    next();
  }
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
