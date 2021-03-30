<template>
  <div class="">
    {{$store.state.count}}
    <p>{{ count }}</p>
    <span @click="aee()">{{count}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
    }
  },
   computed:{
    count(){
      return this.$store.state.count
    }
  },
 }
</script>

<style lang="" scoped>

</style>