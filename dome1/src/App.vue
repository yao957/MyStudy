<template>
  <div id="app" >
    <h1>{{title}}</h1>
    <hr>
    <button @click="lookcard">查看购物车</button>
    <hr>
    <h2>添加课程</h2>
    <div>
        <label for="">课程名称</label>
        <input type="text" v-model="cardinfo.name">
        <br>
        <label for="">课程价格</label>
        <input type="text" v-model="cardinfo.price">
         <br>
        <button @click="editcard">添加</button>
    </div>
    <hr>
    <h2>课程列表</h2>
    <div class="list">
        <ul>
          <li v-for="(item,i) in classlist" :key="i"><strong>{{item.name}}</strong>
            <span>{{item.price}}</span>
            <button @click="gocard(i)">加入购物车</button>
            <button @click="remove()">删除</button>
          </li>
        </ul>
    </div>
    <Cart :caritem = caritem @removeItem="remove"></Cart>
     <!-- <router-view/> -->
  </div>
</template>

<script>
import Cart from './components/Cart.vue'
export default {
  name: '',
  components:{
      Cart
  },
  data() { 
    return {
        title:"购物车",
        cardinfo:{
          name:'',
          price:''
        },
        classlist:[
          {id:0,name:'web前端',price:'9999'},
          {id:1,name:'python教程',price:'8888'},
          {id:2,name:'人工智能',price:'6666'}
        ],
        // 定义一个空的数组 用于接收当前购物车的数据传递给 购物车的组件
        caritem:[]
    }
  },
  methods:{
    // 查看购物车
    lookcard(){

    },
    // 添加购物车
    editcard(){
        this.classlist.push(this.cardinfo)
    },
    remove(index){
      // splice 截取掉返回一个新的数组
      this.caritem.splice(index,1)
    },
     // 加入购物车
    gocard(e){
        let item =this.classlist[e]
        //当多次点击的时候首先判断购物车中是否存在 如果存在数量加一
        let ishas = this.caritem.find(x=>x.id == item.id)
        if(ishas){
          ishas.number +=1
        }else{
          // 这个地方直接push 不行 我们要的数组里面还需要新的字段
          // 也需要原来的字段 所以 ...item代表原来的字段 后面代表新添加的字段 
          this.caritem.push({
            ...item,
            number:1,
            isActive:true //勾选框时使用
          })
        }

      }
    }
 }
</script>
<style >
  *{padding:0px;margin:0px}
</style>