<template>
  <div class="">
      <label for="">{{lable}}</label>
      <div>
          <slot></slot>
          <p v-if='errStatus'>{{errMessage}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:['lable','prop'],
  data() { 
    return {
      errMessage:'',
      errStatus:false
    }
  }
 }
</script>

<style lang="" scoped>

</style>