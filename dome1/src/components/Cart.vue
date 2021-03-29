<template>
  <div class="">
      <h2>我是购物车</h2>
      <table>
        <tr>
          <td>勾选</td>
          <td>课程名称</td>
          <td>课程价格</td>
          <td>数量</td>
          <td>价格</td>
        </tr>
        <tr v-for="(item,index) in caritem" :key="index">
            <td><input type="checkbox"  v-model="item.isActive"></td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><button @click="JianFa(index)">-</button>{{item.number}}<button @click="JiaFa(index)">+</button> </td>
            <td>{{item.price*item.number}}</td>
            <td><button @click="remove(index)">删除</button></td>
        </tr>
        <tr>
            <td></td>
            <td colspan="2">{{ChangNum}}/{{ChangeAll}}</td>
            <td colspan="2">{{PriceAll}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: '',
  // 接收父组件的传值
  props:['caritem'],
  data() { 
    return {
    }
  },
  methods:{
    // 减法
    JianFa(index){
      let num = this.caritem[index].number
      if(num>1){
       this.caritem[index].number-=1;
      }else{
        // 告诉父组件删除
        if(window.confirm('是否删除？')){
          // 如果确认删除 就传递一个监听对象 removeItem  这个监听对象在
          // card组件上绑定了删除的方法remove()
            this.$emit('removeItem',index)
        }
      }
    },
    // 加法
    JiaFa(index){
        this.caritem[index].number+=1;
    },
    // 删除
    remove(index){
        if(window.confirm('是否删除？')){
        // 如果确认删除 就传递一个监听对象 removeItem  这个监听对象在
        // card组件上绑定了删除的方法remove()
          this.$emit('removeItem',index)
      }
    }
  },
  computed:{
      // 计算一共选择了几条
      // 根据 购物车数据 isActive 为true
      ChangNum(){
        return this.caritem.filter( item => item.isActive ).length
      },
      // 计算一共多少条数据
      ChangeAll(){
          return this.caritem.length
      },
      // 计算总价
      PriceAll(){
        // 循环遍历
        let num = 0;
          this.caritem.forEach(item => {
            // 循环数组中isActive 是true的元素
              if(item.isActive){
                  // 计算价格*数量
                num+= item.price*item.number
              }
          });
          return num
      }
    }
 }
</script>

