<template>
  <div class="ImageLoader-container">
    <img v-if="!deletePHImg" :src="placeholder" class="placeholder">
    <img :src="src" @load="loadImg" @transitionend="tranEnd" class="origin" :style="{opacity:Loaded, transition:`${duration}ms`}">
  </div>
</template>

<script>
export default {
    props:{
        src:{
            type:String,
            require:true
        },
        placeholder:{
            type:String,
            require:true
        },
        duration:{
            type:Number,
            default:800
        }
    },
    data(){
        return {
            isLoaded:false, // 原图是否加载完成
            deletePHImg:false, // 是否到时间删除占位图
        }
    },
    computed:{
        Loaded(){
            return this.isLoaded ? 1 : 0
        }
    },
    methods:{
        loadImg(){
            this.isLoaded = true; // 原图加载完成
            this.$emit("load"); // 抛出事件，通知父组件原图已显示
        },
        tranEnd(){ // 动画结束回调函数，删除占位图
            this.deletePHImg = true; // 可删除占位图
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.ImageLoader-container{
    width: inherit;
    height: inherit;
    position: relative;
    overflow: hidden;
    img{
        .self-fit();
        object-fit: cover;
    }
    .placeholder{
        filter: blur(2vw);
    }
    .origin{
        opacity:0;
    }
}
</style>