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