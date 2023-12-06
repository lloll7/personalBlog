<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
// 图标映射集
const classMap = {
  home: "icon-zhuye",
  success: "icon-icon_zhengque",
  error: "icon-icon_cuowu",
  close: "icon-icon_guanbi",
  warn: "icon-icon_jinggao",
  info: "icon-info-circle",
  blog: "icon-blog",
  code: "icon-iconcode",
  about: "icon-set_about_hov",
  weixin: "icon-icon-weixin",
  mail: "icon-iconemail",
  github: "icon-icon_github",
  qq: "icon-QQ",
  arrowUp: "icon-arrowup",
  arrowDown: "icon-arrowdown",
  empty: "icon-empty1",
  chat: "icon-chat",
};
export const types = Object.keys(classMap);
export default {
    props:{
        type:{
            type:String,
            required:true,
        }
    },
    computed:{
        fontClass(){
            return classMap[this.type];
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4103751_0ieg663aefjc.css";
.iconfont{
    font-size: inherit;
    color: inherit;
}
</style>