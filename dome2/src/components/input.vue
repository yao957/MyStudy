<template>
  <div class="">
    {{somval}}
        <input :type="type" :value="value" @input="onInput">
  </div>
</template>
<script>
export default {
  inject:['somval'],
  props:{
    value:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'text'
    }
  },
  data() { 
    return {
    }
  },
  methods:{
    onInput(e){
        let value =e.target.value;
        // input 是绑定的一个对象 它定义父级绑定的方法  value 是值
        this.$emit('input',value)
        // 点击的时候给父组件一个验证方法validate 
        // 如果多层嵌套就不行 
        // 方法一
        this.$parent.$emit('validate')
    }
  }
 }
</script>

<style lang="" scoped>

</style>