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
// 这个是element 自带的校验库
import Schema from 'async-validator'
export default {
  inject:['Zfrom'],
  name: '',
  props:['lable','prop'],
  data() { 
    return {
      errMessage:'',
      errStatus:false
    }
  },
  // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted () {
  //$on 和 $emit 一起使用
  // $on：监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
  // $emit：触发当前实例上的事件。附加参数都会传给监听器回调
    this.$on('validate',this.validator)
  },
  methods: {
    validator() {
        console.log('开始校验');
        const rules = this.Zform.rules[this.prop];
        const value = this.Zform.model[this.prop];

        let descriptor = {[this.prop]:rules};
        let Schema = new Schema(descriptor);
        //  校验器
        Schema.validator({[this.prop]:value},errors =>{
            if(errors){
              this.errMessage = errors[0].message;
              errStatus = true
            }else{
              this.errMessage = '';
              this.errStatus = ''
            }
        })
    }
  },
 }
</script>

<style lang="" scoped>

</style>