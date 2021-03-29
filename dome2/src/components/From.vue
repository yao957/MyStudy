<template>
  <div class="">
      <form>
          <slot></slot>
      </form>
  </div>
</template>

<script>
export default {
  name: '',
  provide(){
    return {
      // 表示把Zfrom当成一个实例对象传递出去了
      Zfrom:this
    }
  },
  props:{
    model:{
      type:Object,
      required:true
    },
    rules:{
      type:Object,
    }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="" scoped>
</style>