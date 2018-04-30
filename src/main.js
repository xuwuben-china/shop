// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from '@/router.config.js'
import store from '@/store/store.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = Axios;

var router = new VueRouter(routerConfig)

Vue.filter('time',function(time){
		var date = new Date(time),
			y = date.getFullYear(),
			m = date.getMonth() + 1,
			d = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes();
		return y + "-" + m + "-" + d + " " + hour + ":" + minute;
	})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
