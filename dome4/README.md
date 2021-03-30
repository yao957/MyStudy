### Vuex状态管理模式

参考一 https://juejin.cn/post/6844903937745616910#heading-2

参考二  https://zhuanlan.zhihu.com/p/100941659

npm install vuex --save

### 1.1 store （data）

在store/index.js 仓库中定义一个 全局状态元素 count

```
 state: { 
    count:66,
  },
```

##### 调用方法一

在需要使用的vue组件中使用

 在 计算属性中

```
 computed:{
    count(){
      return this.$store.state.count
    }
  }
```

然后在template中

```
<p>{{ count }}</p>
```

可以跟vue的其他属性一样使用方法

```
<span @click="aee()">{{count}}</span>
```

```
  methods:{
    aee(){
      this.$store.state.count--
    }
  },
```

##### 调用方法二 

直接调用 在template中

```
<p>{{this.$store.state.count}}</p>
```



有时候需要获取多个 全局状态元素 那么可以使用 mapState



### 1.2 mapState

多个store的集合使用

比如：

```
state: { 
    nickname:'Simba',
    age:20,
    gender:'男',
},
```

##### 第一步 引入

（那个组件使用就在那引入）

```
import { mapState } from 'vuex';
```

##### 第二步 使用

这里使用了mapState方法后，computed(计算属性)的写法有点区别

简便写法

```text
computed: mapState(['nickname','age','gender'])
```

这句话就相当于

```
computed:{
    nickname(){
        return this.$store.state.nickname
    },
    age(){
        return this.$store.state.age
    },
    gender(){
        return this.$store.state.gender
    }
}
```

展开运算符

```text
 ...mapState(['nickname','age','gender'])
```

vue的计算属性computed不能传值  如何自定义计算属性

那么就要使用到vuex的getters



### 2.1 getters （计算属性）

相当于vue中的计算属性，（注意：vue的计算属性不能传值）

Vuex的允许传参，第一个参数就是state

##### 第一步 定义操作对象

在store/index.js中 

```
state:{
    list: [1, 2, 3, 4, 5, 6, 7, 8],
}
```

##### 第二步 定义操作方法

```
  getters:{
  //计算数组list中的偶数
    modifyArr(state) {
      return state.list.filter((item, index, arr) => {
        return item % 2 == 0;
      })
    },
    //计算modifyArr处理后的数组的长度
   	getLength: (state, getters) => {
      return getters.modifyArr.length
    }
  }
```



### 2.2 mapGetters

##### 第一步 引入

```
import {mapGetters} from 'vuex';
```

```
computed: {
  ...mapGetter(['modifyArr', 'getLength'])
}
```

指定别名

```
computed: {
  mapGetter({
    arr: 'modifyArr',  
    length: 'getLength'
  })
}

```

##### 第二 使用

```
{{this.$store.getters.modifyArr}}
```

##### 注意

你的computed属性包含其他计算方法，那你就只能使用展开运算符的写法

```
computed: {
  msg() {
    return this.num * 10;
  },
  ...mapGetters([
    'modifyArr',
    'getLength'
  ])
}

```







### 3.1 Mutation （方法）

类似于vue中的methods 方法

第一个参数是**state**，第二个参数是**载荷**（payLoad），也就是额外的参数

##### 第一步 定义

```
mutations: { //类似于methods
  addAge(state,payLoad){
     state.age += payLoad.number
  }
}
```

##### 第二步 使用

template

```
<div class="home">
   <div><button @click="test">测试</button></div>
</div>
```

js部分 

##### 注意一

mutations需要通过**commit**来调用其里面的方法，

```
methods:{
 test(){
   this.$store.commit('addAge',{
     number:5
   })
 }
}
```

##### 注意二

调用的时候第二个参数最好写成**对象形式**，这样我们就可以传递更多信息。

payLoad 就等于 number:5



如果有多个方法 那么就使用**mapMutations**



### 3.2 mapMutations 

跟mapState、mapGetters一样

```
methods:{
 ...mapMutations(['addAge'])
}
```

相当于

```text
addAge(payLoad){
  this.$store.commit('addAge',payLoad)
}
```

payLoad参数 在调用这个方法的时候写入

```
<button @click="addAge({number:5})">测试</button>
```



##### 注意

mutations只能写同步方法，**不能写异步**，比如axios、setTimeout等，这些都不能写，

**mutations的主要作用就是为了修改state的**。

原因类似：如果在mutations中写异步，也能够调成功，但是由于是异步的，不能被调试工具追踪到，所有不推荐这样写，不利于调试,这是官方的约定。



### 4.1 actions （可提交的方法）

####  注意

1.action类似于mutation，但是可以提交（连接数据库提交数据）

2.mutation只能包含同步事务，处理异步事务需要Action，Action默认的就是异步，并且返回promise

3.action 提交的是 mutation，通过Action控制了异步这一过程，之后再去调用mutation里面的方法来改变状态

也就是说（action也**不要**直接去操作state，而是**去操作**mutation）

4.commit 和dispatch的区别在于

commit是提交mutatious的同步操作，dispatch是分发actions的异步操作

dispatch：异步操作，例如向后台提交数据，写法： this.$store.dispatch(‘action方法名’,值)

commit：同步操作，写法：this.$store.commit(‘mutations方法名’,值)



#### 第一步 赋值

首先要想得到数据，那就相当于给state赋值，那首先想到的就是mutations来操作state，但是请求的接口都是axios异步，所以就不能用mutations而是用actions，通过actions来操作mutations从而操作state

```
state: {
  product: 'car'
}
```

#### 第二步 定义方法

定义方法

```
 mutations: {
    changeProduct(state, payload) {
      state.product = payload.change;
    }
}
```

payload.change 是提交过来的值也是要改变的值 我们说的操作方法中的数据也就是操作它

#### 第三步 异步函数

在action中

```
actions: {
  changeProduct(context, payload) {
    let temp = 'ship+' + payload.extraInfo; 
    setTimeout(() => {
      context.commit('changeProduct', {change: temp});
    }, 1500)
  }
}

```

#### 第四步 点击事件

html

```
  <h2>异步 {{this.$store.state.product}}</h2>
  <button @click='selectProduct()'>值变化</button>
```

#### 第五步 触发事件

在组件methods 定义触发事件

```
methods: {
  selectProduct() {
    // this.$store.dispatch('changeProduct')
    // 载荷方式分发
    // this.$store.dispatch('changeProduct', {
    //   extraInfo: 'sportcar'
    // })
    // 或者这种
    this.$store.dispatch({
      type: 'changeProduct',
      extraInfo: '->sportcar'
    })
  }
},

```

得到结果 1.5秒后刷新

输出 ship+->sportcar



### 4.2 mapActions

```
import {mapActions} from 'vuex';
```

state

```
    userInfo: { // 这个变量用来测试组合变量
      name: 'lee',
      age: 23
    }
```

```
mutations: {
    // 以下用来测试组合action
    changeInfo1(state, payload) {
      state.userInfo.name = 'lee haha111111';
    },
 
    changeInfo2(state, payload) {
      state.userInfo.age += 70;
    },
}
```



一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行

```
actions: {
   changeInfoa({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('changeInfo1');
          resolve();
        }, 2000)
      })
    },
    changeInfob ({ dispatch, commit }) {
      return dispatch('changeInfoa').then(() => {
        commit('changeInfo2')
      })
    }
    }
```



html

```

    <h2>组合action</h2>
    <h4>{{status}}</h4>
    <p>姓名{{ this.$store.state.userInfo.name }} 
    年级{{ this.$store.state.userInfo.age }}</p>
    <div><button @click="modifyInfo">修改信息</button></div>
```

data

```
  data() { 
    return {
      status: '信息还没修改！',
    }
  },
```

methods

触发完成后返回

```
modifyInfo() {
        this.$store.dispatch('changeInfob').then(() => {
        this.status = '信息修改成功';
    });
},
```



### 5.Module

#### 模块写法

```
// 定义的模块A
const moduleA = {
  state: {name: 'lee', age: 23, },
  mutations: {},
  getters: {},
  actions: {}
};

// 定义模块B
const moduleB = {
  state: {name: 'wang',age: 22},
  mutations: {},
  getters: {},
  actions: {}
}

```

然后再Vuex里面声明模块：

```
export default new Vuex.Store({
//声明模块
  modules: {
    ma: moduleA,
    mb: moduleB
  },
  state: {
    ........... // 其他状态
  }
});

```



这样一来，如果我们想要在组件里面访问其他模块的状态，可以这样，比如这里我想调用B模块里的状态：

```
computed: {
  msg() {
    return this.$store.mb; // 这里返回的是：{name: 'wang', age: 22}
  }
}
```



#### 模块内部方法

##### action

模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState

```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

```



#####  getter

模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

方法的调用不存在作用域的限制

store.js

```
const moduleB = {
  state: {
    name: 'wang',
    age: 22,
    desc: 'nope'
  },
  mutations: {
    modifyDesc(state, payload) {
      state.desc = payload.newMsg;
    }
  },
  getters: {

  },
  actions: {

  }
}

```

vue

```
<template>
  <div>
    <h2>7、module使用示例</h2>
    <div>
      <p>名字：{{ name }}</p>
      <p>描述：{{ desc }}</p>
      <button @click="handleClick">修改描述</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.mb.name,
      // desc: this.$store.state.mb.desc 注意这个如果涉及到要在store里面会被改变的状态，一定要写在
      // computed属性里面，不然不能及时反馈到视图上
    }
  },
  computed: {
    desc() {
      return this.$store.state.mb.desc;
    }
  },
  methods: {
    handleClick() {
      this.$store.commit('modifyDesc', {newMsg: 'lao wang is beautiful!'});
    }
  },
}
</script>

```

##### 注意

这个如果涉及到要在store里面会被改变的状态，一定要写在computed属性里面，不然不能及时反馈到视图上

```
  computed: {
    desc() {
      return this.$store.state.mb.desc;
    }
  }
```



#### 空间命名

使模块具有更高的封装度和复用性

通过添加 `namespaced: true` 的方式使其成为带命名空间的模块

被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名

```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。



#### 在带命名空间的模块内访问全局内容

如果想要在模块内部的getters、mutations和actions里面访问到全局的内容，这儿Vuex已经封装好了，你只需要多传几个参数即可



你可以使用 getter 的第四个参数来调用 `rootGetters`

```
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}

```

#### 在模块里面使用辅助函数

##### 方法一

mapState

```
computed: {
  ...mapState('mc', ['name', 'desc']) // 这里模块里面要使用辅助函数的话要多传一个参数才行
}
```

或者

```
computed: {
  ...mapState('mc', {
    name(state) {
      return state.name;
    },
    desc(state) {
      return state.desc;
    }
  })
},

```

其他辅助函数方法类似

```
methods: {
  ...mapMutations('mc', ['modifyName'])
}
```

##### 方法二

使用`createNamespacedHelpers`创建基于某个命名空间辅助函数，它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('mc');
```

