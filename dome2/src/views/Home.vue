<template>
  <div class="home">
    <h1>双向绑定的原理</h1>
       {{value}}
       <!-- arguments 是一个对应于传递给函数的参数的类数组对象  value = arguments[0] 赋值-->
      <Zinput :value='value' @input=" value = arguments[0]"></Zinput>
      <Zinput v-model="value"></Zinput>
      <br>
      <hr>
      <Zfrom :model="model" :rules="rules">
          <Zfromitem lable="用户名" prop="username">
              <Zinput v-model="model.username" ></Zinput>
          </Zfromitem>
          <Zfromitem lable="密码" prop="password">
              <Zinput v-model="model.password" type='password'></Zinput>
          </Zfromitem>
      </Zfrom>
  </div>
</template>

<script>
import Zinput from '@/components/input.vue'
import Zfromitem from '@/components/Fromitem.vue'
import Zfrom from '@/components/From.vue'
export default {
  name: 'Home',
  // provide方法 
  // vue提供了provide和inject帮助我们解决多层次嵌套嵌套通信问题。
  // 在provide中指定要传递给子孙组件的数据，子孙组件通过inject注入祖父组件传递过来的数据。
  provide(){
    return {
      somval:'来自app.vue 跨级父孙'
    }
  },
  components: {
    Zinput,Zfrom,Zfromitem
  },
  data(){
    return {
      value:'',
      model:{
        username:'',
        password:''
      },
      rules:{}
      
    }
  },
  methods:{
  },
  
}
</script>
