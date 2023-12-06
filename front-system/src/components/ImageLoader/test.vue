<template>
  <div class="test-container">
    <ImageLoader 
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      @load="handleLoader"
    />
  </div>
</template>

<script>
import ImageLoader from "./"
export default {
    components:{
        ImageLoader,
    },
    methods: {
      handleLoader(){
        console.log("原图加载完成");
      }
    },
}
</script>

<style>

</style>