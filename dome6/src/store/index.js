import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置一个登陆状态
    isLogin: false
  },
  mutations: {
    // 定义一个方法 通过这个方法改变我们的登录状态 b是传进来的值
    // 传false 注销 为ture为登录
    setLoginState (state, b) {
      state.isLogin = b
    }
  },
  // 异步
  actions: {
    
  },
  modules: {
  }
})
