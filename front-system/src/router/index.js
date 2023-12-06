import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "../utils";

if (!window.VueRouter) {
  // 当不是CDN引入资源时，即是开发环境时，则用该语句
  Vue.use(VueRouter); // 使用一个vue插件
}

const router = new VueRouter({
  // 配置
  routes,
  mode: "history", // 历史模式，更符合常规，不会像hash模式一样，路径只读#后面的
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;
