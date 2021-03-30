import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局导航守卫
// beforeEach 当一个导航触发时，全局前置守卫按照创建顺序调用
// to 要到那个路由去
// from 从那个路由来
// next 继续向下
router.beforeEach( (to,from, next) =>{
  // 比如登录之前 做判断 没有登录 跳转到登录 next("/login")
  console.log('before each');
  next();
})
// 全局解析守卫 2.5.0新增 与beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和
// 异步路由组件被解析之后，解析守卫就被调用
// 时间比前置钩子时间完一点
router.beforeResolve( (to,from, next) =>{
  console.log('before Resolve');
  next();
})

// 全局后置钩子
router.afterEach( (to,from ) =>{
  console.log('after each');
 
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
