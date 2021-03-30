<template>
  <div class="home">
      <h4>我是模板View1</h4>
      <p>测试组件内的路由守卫</p>
  </div>
</template>

<script>
export default {
    beforeRouteEnter(to,from,next){
        // 在渲染该组件的对应路由被 confirm 验证通过 前调用
        // 不能获取组件实例 this
        // 因为当守卫执行前,组件实例还没被创建
        console.log(`before Route Enter`);
        console.log(this);
        next()
    },
    beforeRouteUpdate(to,from,next){
        // 在当前路由改变,但是该组件被复用是调用
        // 举例说明,对于一个带有动态参数的路径,/foo/:id ，在/foo/1 和/foo/2 之间跳转
        // 的时候，由于会渲染通用的foo组件，因此组件实例会被复用，而这个钩子就会在这个
        // 情况下被调用
        // 可以访问组件实例 this
           console.log(`before Route Update`);
            console.log(this);
              next()
    },
    beforeRouteLeave(to,from,next){
        // 导航离开改组件的对应路由是调用
        // 可以访问组件实例 this
        // 通常用来禁止用户在还未保存修改前突然离开，该导航可以通过next(false) 来取消
          console.log(`before Route Leave`);
           console.log(this);
          next()
    }


}
</script>