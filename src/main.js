require('dotenv').config();

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted';
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.scss'

library.add(faSpinner,faEye, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
