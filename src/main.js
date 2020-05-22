import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2'
import bus from './bus'
import store from './store'

Vue.use(VueSweetalert2);
Vue.config.productionTip = false
Vue.prototype.$bus = bus

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  template: '<router-view></router-view>',
}).$mount('#app')

