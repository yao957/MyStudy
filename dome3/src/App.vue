<template>
  <div id="app">
    <div id="nav">
      <!-- 写法一 -->
      <router-link to="/">Home</router-link> |
      <!-- 写法二 -->
      <router-link :to="{name: 'About'}">About</router-link>|
      <router-link :to="{name: 'View1'}">View1</router-link>

    </div>
    <router-view/>
    <router-view name="View1"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
