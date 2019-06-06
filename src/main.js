import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.scss'
import Router from "vue-router";

library.add(faSpinner);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(Toasted);
Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('./components/movies/Index.vue'),
    props: true,
  },
    {
      name: 'movie.show',
      path: '/movie/:movie',
      component: () => import('./components/movies/Show.vue'),
      props: true,
    },
];

const router = new Router({
    routes,
    mode: 'history'
});

Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
