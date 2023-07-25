import { createRouter, createWebHistory } from 'vue-router';

// query初始值
let queryName = '';

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' },

  {
    path: '/',
    redirect: () => {
      return { path: '/report', query: { station: queryName } };
    },
    meta: {
      title: '醫材使用率',
      hidden: true,
    },
  },

  {
    path: '/report',
    name: 'report',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/report/material_rate/index.vue'
      ),

    meta: {
      title: '醫材使用率',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let currentStationQuery = localStorage.getItem('currentStationQuery');
  const url = window.location;
  const urlHref = window.location.href; // url 完整路徑
  const urlHrefString = urlHref.toString(); // 轉成字串
  const params = new URL(document.location).searchParams;
  const getStation = params.get('station'); //取得 station query

  const { title } = to.meta;
  window.document.title = title ? 'Miko | ' + title : 'Miko Rtls Charts';
  const { stationID } = to.query;

  queryName = currentStationQuery;

  if (getStation !== currentStationQuery) {
    localStorage.setItem('currentStationQuery', getStation);
    return next();
  } else {
    return next();
  }
});

export default router;
