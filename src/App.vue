<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app{
  width: 100%;
  height: 100%;
  .is-active{
    width: 100%;
    height: 100%;
    color: #1ec67a;
    // background: #1169af;
  }
}
</style>
