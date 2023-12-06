<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="hanldeMouse"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imagePosition" ref="Image">
      <ImageLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="carousel-title" ref="title">{{ carousel.title }}</div>
    <div class="carousel-desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 内层容器的尺寸
      mouseX: 0, // 鼠标的 横坐标
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  computed: {
    // 得到图片坐标
    imagePosition() {
      // 若一开始没加载完成时还没有值，则返回
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      // 两个极端情况
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      // 通过比例关系求出
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    // 图片中心
    center() {
      return {
        x: this.containerSize.width / 2 + 702,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    // 最开始将轮播图设置在中间
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    showWords() {
      // title文字
      // 原先是有宽度，但是是隐藏的，所以这样可以在mounted的时候获取到合适的宽度
      // 当图片加载完后，显示容器，但是同时把宽度设为零，这样用户看到的效果就是一直都不显示
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0 + "px";
      // 强制渲染
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "1s";
      // 这时开始重新将最开始获取到的宽度重新赋值上去，然后加上transition
      // 用户看到的效果就是文字从无慢慢到有
      this.$refs.title.style.width = this.titleWidth + "px";

      // desc文字
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0 + "px";
      // 强制渲染
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.Image.clientWidth,
        height: this.$refs.Image.clientHeight,
      };
    },
    hanldeMouse(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left + 702; // 鼠标相对于外部容器的坐标
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  background-color: @dark;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s linear;
  }
  .carousel-title,
  .carousel-desc {
    position: absolute;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    left: 30px;
    letter-spacing: 3px; // 行间距
    color: #fff;
    color: lighten(@gray, 20%);
    opacity: 0;
    // 给文字描边，也就是设置多重阴影，四个边都设置1px的阴影
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap; // 不允许换行
    overflow: hidden;
  }
  .carousel-title {
    top: calc(50% - 35px);
    font-size: 2.5em;
  }
  .carousel-desc {
    top: calc(50% + 25px);
    font-size: 1.6em;
  }
}
</style>
