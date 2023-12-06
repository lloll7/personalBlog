<template>
  <div id="app">                                                  <!-- 注册子组件抛出的事件 -->
    <Pager :total="total" :current="current" @pageChange = "handlePageChange"/> 
  </div>
</template>

<script>
import Pager from "./"

export default {
  name:"App", // 如果组件没有在注册的时候指定名字， 则使用该名字
  components: {
    Pager,
  },
  data(){
    return {
      current:2,
      total:400
    }
  },
  methods: {
    // 更新当前页码
    handlePageChange(newPage){
      this.current = newPage
    }
  },
}
</script>

<style lang="less" scoped>
  .ican-container{
    font-size: 20px;
    color: red;
  }
</style>
