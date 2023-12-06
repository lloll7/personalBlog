<template>
<div class="home-container" ref="container">
    <ul class="carousel-container" :style="{
        marginTop,
    }"  @wheel="handleWheel" @transitionend="handleTransitionEnd">
        <li v-for="item in banners" :key = "item.id">
            <Carouseitem :carousel="item"/>
        </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click = "switchTo(index - 1)">
        <Icon type="arrowUp" />
    </div>
    <div v-show="index < banners.length - 1" class="icon icon-down" @click = "switchTo(index + 1)">
        <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
        <li :class="{ active: i === index}" v-for="(item, i) in banners" :key = "item.id" @click = "switchTo(i)"></li>
    </ul>
    <Loading v-if="isLoading"/>
</div>
</template>

<script>
import {getBanner} from "@/api/banner";
import Carouseitem from "@/views/Home/Carouseitem";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
export default {
    components:{
        Carouseitem,
        Icon,
        Loading,
    },
    data(){
        return {
            isLoading:true,
            banners:[],
            index:0,
            containerHeight:0,// 整个容器的高度
            switching:false, // 是否正在切换中
        }
    },
    computed:{ 
        marginTop(){ // 轮播图滚动的距离
            return - this.index * this.containerHeight + "px";
        }
    },
    async created(){ // 在注入后异步获取数据
        this.banners = await getBanner();
        this.isLoading = false;
    },
    mounted() { // 在真实dom生成后，获取容器的宽度
        this.containerHeight = this.$refs.container.clientHeight;
        window.addEventListener("resize",this.handleResize)
    },
    destroyed() { // 组件销毁时移除window的resize事件
        window.removeEventListener("resize",this.handleResize)
    },
    methods: {
        switchTo(targetIndex){ 
            this.index = targetIndex;
        },
        handleWheel(e){ // 今天滚轮滚动来切换轮播
            if(this.switching){
                return;
            }
            if(e.deltaY < -5 && this.index > 0){
                console.log("上一个");
                this.index--;
                this.switching = true;
            }
            if(e.deltaY > 5 && this.index < this.banners.length - 1){
                console.log("下一个");
                this.index++;
                this.switching = true;
            }
        },
        handleTransitionEnd(){
            this.switching = false;
        },
        handleResize(){
            this.containerHeight = this.$refs.container.clientHeight;
        }
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container{
    width: 100%;
    height:100%;
    overflow: hidden; // 开启bfc，否则会与轮播图容器移动时的marginTop外边距合并
    position: relative;
    ul{
        margin:0; 
    }
}
.carousel-container{
    width: 100%;
    height:100%;
    transition: 500ms;
    li{
        width: 100%;
        height:100%;
        padding: 0;
        margin: 0
    }
}
.icon{
    .self-center();
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);
    @gap:25px;
    &.icon-up{
        top: @gap;
        animation: jump-up 2s infinite;
    }
    &.icon-down{
        top: auto;
        bottom: @gap;
        animation: jump-down 2s infinite;
    }
    @jump:5px;
    @keyframes jump-up {
        0%{
            transform: translate(-50%,@jump);
        }
        50%{
            transform: translate(-50%,-@jump);
        }
        100%{
            transform: translate(-50%,@jump);
        }
    }
    @keyframes jump-down {
        0%{
            transform: translate(-50%,-@jump);
        }
        50%{
            transform: translate(-50%,@jump);
        }
        100%{
            transform: translate(-50%,-@jump);
        }
    }
}
.indicator{
    position: relative;
    .self-center();
    left: auto;
    right: 10px;
    transform: translateY(-50%);
    li{
        width: 8px;
        height: 8px;
        padding: 0;
        border-radius: 50%;
        background-color: @words;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid #fff;
        box-sizing: border-box;
        &.active{
            background-color: #fff;
        }
    }
}
</style>