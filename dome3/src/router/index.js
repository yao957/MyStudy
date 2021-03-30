import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import text from '../views/text.vue'
import View1 from '../views/View1.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    redirect:'/'    //重定向 访问/index 跳转到/
  },
  {
    path: '/',
    name: 'Home', //路由的命名
    components: {
      default:Home,
      View1:View1
    } //路由的模板
  },
  {
    // 动态路由
    path: '/About/:id', 
    name: 'About', 
    props:true, //使用props之后 在页面之间调用
    component: About,
    children:[
        {
          path: 'text', 
          name: 'text', 
          component: text,
        }
    ]
  },


  {
    path: '/View1',
    name: 'View1', //路由的命名
    // 路由独享钩子
    beforeEnter:(to,from,next)=>{
        // 进入这个路由之前调用
        console.log('即将~~');
        // 不写next 则不会继续向下执行
        next()
    },
    components: {
      default:View1,
      View1:text
    } //路由的模板
  },



]

const router = new VueRouter({
  mode:'history',  //历史模式 可以去掉路由的#
  routes
})

export default router
