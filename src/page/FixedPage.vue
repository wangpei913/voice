<template>
  <div class="fiexd-page">
    <sticky :zIndex="900">
      <div style="text-align: center;background-color: yellow;height: 100px">
        NAV
      </div>
    </sticky>
    <sticky :top="100" >
      <div style="height: 200px;background-color: red;"></div>
    </sticky>
    <div style="height: 600px;text-align: center">
      RED
    </div>
    <sticky :top="100" :zIndex="200" @fixed="fixed">
      <div style="height: 200px;background-color: pink;"></div>
    </sticky>
    <div style="height: 600px;text-align: center">
      PINK
    </div>
    <sticky :top="100" :zIndex="300">
      <div style="height: 200px;background-color: green;"></div>
    </sticky>
    <div style="height: 600px;text-align: center">
      BLUE
    </div>
  </div>
</template>

<script>
  import sticky from "../components/vueCom/fixedSticky";
  export default {
    components: {
      sticky
    },
    methods:{
      fixed (val) {
        console.debug(val?"fixed":"static");
      }
    }
  }
</script>
<style lang="less" scoped>
.fiexd-page{
    width: 100%;
    height: 100%;
}
</style>

