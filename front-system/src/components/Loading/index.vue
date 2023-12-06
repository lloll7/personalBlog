<template>
    <img :src="imgUrl" alt=""  class="loadingContainer">
</template>

<script>
import imgUrl from "@/assets/loading.svg";
export default {
  data(){
    return{
      imgUrl,
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.loadingContainer{
  .self-center()
}
</style>