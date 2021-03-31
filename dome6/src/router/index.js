import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login'
import Main from '../views/Main'

Vue.use(VueRouter)

const routes = [

  {
    path: '/index',
    redirect: '/' // 重定向 访问/index 跳转到/
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 设置路由是否需要认证  认证标识
    meta: {
      auth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    // 设置路由是否需要认证  认证标识
    meta: {
      auth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断 要去的那个路由是否有认证标识  有就登录
  if (to.meta.auth) {
    // 需要登录
    // 设置一个变量token 代表当前客户端的token值
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/Login',
        query: { redirect: to.path } // 重定向到要去的那个路由
      })
    }
  } else {
    // 这里不要忘记了else
    next()
  }
})

export default router
