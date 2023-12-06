// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less"; // 导入全局样式
import router from "./router";
import "./api/banner";
import "./eventBus"; 
import store from "./store";
store.dispatch("setting/fetchSetting");
// 导入showMessage方法
import { showMessage } from "@/utils";
// 将该方法注入到Vue原型对象上,让所有Vue实例对象都可以不导入showMessage而直接使用该方法
Vue.prototype.$showMessage = showMessage;

// 定义全局指令
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 测试接口
// import { getProject } from "@/api/project";
// window.getProject = getProject;
// getProject().then((resp) => {
//   console.log(resp);
// });
// import { getAbout } from "@/api/about";
// window.getAbout = getAbout;
// getAbout().then((resp) => {
//   console.log(resp);
// });
// import getBanner from "@/api/banner";
// window.getBanner = getBanner;
// getBanner().then((resp) => {
//   console.log(resp);
// });
// import * as blogApi from "./api/blog";
// blogApi.getBlog("sss").then((data) => {
//   console.log(data);
// });

// blogApi
//   .postComment({
//     nickname: "昵称",
//     content: "评论内容，纯文本",
//     blogId: 1,
//   })
//   .then((data) => {
//     console.log(data);
//   });

// blogApi.getComments("123123").then((r) => {
//   console.log(r);
// });

// 测试事件总线;
// import eventBus from "./eventBus";

// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }

// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler2);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;
