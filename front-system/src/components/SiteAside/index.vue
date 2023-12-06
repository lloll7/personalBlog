<template>
  <div class="SiteAside">
    <template v-if="data">
      <Avatar class="Avatar_container" :url="data.avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>

    <Menu class="Menu_container" />
    <Contact v-if="data" />
    <p class="footer" v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
// 用js设置路径时，需要用import引入或require引入，因为打包后的图片路径会变
import headerImg from "@/components/SiteAside/headerIcon/Personal_Icon.jpg";
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headerImg,
    };
  },
  components: {
    Avatar,
    Contact,
    Menu,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less">
@import "~@/styles/var.less";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.SiteAside {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: @dark;
  padding-top: 1.5%;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 18px;
}
.Menu_container {
  margin-top: 5%;
  margin-bottom: 20%;
  margin-top: 10%;
}
.LI {
  position: relative;
  padding-left: 10%;
  width: inherit;
  height: 30px;
  line-height: 30px;
  color: @gray;
  margin-bottom: 10px;
  cursor: pointer;
}
.icon {
  margin-right: 10px;
}
.UL {
  list-style: none;
  padding: 0;
}
.footer {
  position: absolute;
  text-align: center;
  font-size: 12px;
  bottom: 5%;
}
.title {
  font-size: 1.2em;
  line-height: 10px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}
</style>
