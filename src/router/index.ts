import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@pages/HomePage';
import FilmPage from '@pages/FilmPage';
import ErrorPage from '@pages/ErrorPage';

const routes = [
  {
    path: '/',
    name: 'Films',
    component: HomePage,
  },
  {
    path: '/movie/:id',
    name: 'Film',
    component: FilmPage,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
