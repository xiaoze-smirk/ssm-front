import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css'
import './components/common/directives'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.prototype.$axios = axios

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('user')
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
