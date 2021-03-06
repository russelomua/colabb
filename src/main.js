import Vue from 'vue'
import App from './App.vue'
//plugins
import './plugins/bootstrap'
import './plugins/moment'
import './plugins/resource'
import store from './plugins/store'
import router from './plugins/router'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
