<template>
  <div id="app">
    <Avatar url="https://picx.zhimg.com/80/v2-526038472bd17ef823bb5d6259f1b51e_720w.webp?source=1940ef5c"/> 
  </div>
</template>

<script>
import Avatar from "./";
export default {
  name:"App", // 如果组件没有在注册的时候指定名字， 则使用该名字
  components:{
    Avatar,
  }
}
</script>

<style lang="less" scoped>
  .ican-container{
    font-size: 20px;
    color: red;
  }
</style>
