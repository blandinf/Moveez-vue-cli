import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);

const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('./components/movies/Index.vue'),
    },
    {
        name: 'movie.show',
        path: '/movie/:id',
        component: () => import('./components/movies/Show.vue'),
        props: true,
    },
    {
        name: 'search',
        path: '/search/:search',
        component: () => import('./components/movies/Search.vue'),
        props: true,
    },
];

const router = new Router({
    routes,
    mode: 'history'
});

export default router