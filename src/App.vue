<template>
  <div id="app">
    <router-view/>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/contents/maintabbar/MainTabBar'
  export default {
    name: 'app',
    components: {
        MainTabBar
    }
  }
</script>

<style>
  /*css 引入方式*/
  @import "assets/css/base.css";
</style>
