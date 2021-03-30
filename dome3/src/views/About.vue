<template>
  <div class="about">
    <p>若路由为 <span style="color:#f00"> about/123 </span>这种类型的时候
      <br>
      params 有值
    </p>
    {{$route.params}}
    <br>
    query 无值

    <hr>
    <p>若路由为<span style="color:#f00"> about/123?name=zhangsan&age=18  </span>这种类型的时候
       <br>
       params 有值
       <br>
        {{$route.params}}
      <br>
      query 有值
    </p>
    {{$route.query}}
    <hr>
    <p> 使用props {{id}}</p>
    <!-- 子路由要显示 要在父组件添加 router-view -->
    <router-view/>
  </div>
</template>

<script>
export default {
    props:["id"],//使用了props 之后可以直接使用传递值
    created(){
     console.log(this.$route);
    }
}
</script>