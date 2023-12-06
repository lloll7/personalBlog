// import Vuex from "vuex";
import { Store, install } from "vuex"; // 局部引入，减小空间浪费
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
  // 当不是CDN引入资源时，即是开发环境时，则用该语句
  // Vue.use(Vuex);
  install(Vue);
}

export default new Store({
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
});
