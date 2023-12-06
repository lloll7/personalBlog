<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px', // 要用单引号
      height: size + 'px',
    }"
  />
  <!-- <img src="../SiteAside/headerIcon/Personal_Icon.jpg" alt=""> -->
</template>

<script>
export default {
  props: {
    url: {
      // 进一步约束
      type: String, // 表示url属性必须是个字符串
      required: true, // 不能为空
    },
    size: {
      type: Number,
      default: 150, // 默认值
    },
  },
};
</script>

<style scoped>
/* 带有作用域的样式 */
.avatar-container {
  /* display: block; */
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
