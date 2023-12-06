<template>
  <div class="test-container">
    <Empty text="无数据"/>
  </div>
</template>

<script>
import Empty from "./"
export default {
    components:{
        Empty,
    }
}
</script>

<style>
.test-container{
  position: relative;
  width: 500px;
  height:500px;
  border: 1px black solid;
  margin: 0 auto;
}
</style>