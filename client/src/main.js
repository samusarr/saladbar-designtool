import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UniqueId from 'vue-unique-id';
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)
// Unique ID -plugin
Vue.use(UniqueId);

Vue.config.productionTip = false

// Set up default http modules for api calls
Vue.prototype.$http = axios;
// Load token from localstorage
const token = localStorage.getItem("token");
// If there is token --> append default axios authorization headers
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
