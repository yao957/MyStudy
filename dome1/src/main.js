import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自定义的 scss 安装 方法 npm i sass sass-loader@7  高版本会报错 
import './assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
