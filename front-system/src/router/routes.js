// 路由匹配规则
// import Home from "@/views/Home";
// import About from "@/views/About";
// import Blog from "@/views/Blog";
// import Message from "@/views/Message";
// import Project from "@/views/Project";
// import BlogDetail from "@/views/Blog/Detail";
import NotFound from "@/components/NotFound";

import delay from "@/utils/delay";

// 设置加载进度条的第三方库
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";

configure({
  // 进度条速度
  trickleSpeed: 20,
  showSpinner: false,
});

function getPageComponent(pageComponentResolve) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      delay(2000);
    }
    const resp = await pageComponentResolve();
    done();
    return resp;
  };
}

export default [
  {
    name: "Home", // 改为命名路由，以免以后某个路径名改变时，要改所有链接的跳转路径名，用命名路由，则所有链接原先就只找路由名称就好，而不是找路径名
    path: "/",
    // 设置路由懒加载（页面分包），优化项目体积。动态import
    // 返回的是一个Promise对象，resolve的结果返回值是组件配置对象，称为异步组件
    component: getPageComponent(() =>
      import(/* webapckChunkName:"home" */ "@/views/Home")
    ),
    meta: {
      title: "首页",
    },
  },
  {
    name: "About",
    path: "/about",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"about" */ "@/views/About")
    ),
    meta: {
      title: "关于",
    },
  },
  {
    name: "Blog",
    path: "/article",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"blog" */ "@/views/Blog")
    ),
    meta: {
      title: "文章",
    },
  },
  {
    name: "CategoryBlog",
    path: "/article/cate/:categoryId",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"blog" */ "@/views/Blog")
    ),
    meta: {
      title: "文章列表",
    },
  },
  {
    name: "BlogDetail",
    path: "/article/:id",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"blogDetail" */ "@/views/Blog/Detail")
    ),
    meta: {
      title: "文章详情",
    },
  },
  {
    name: "Message",
    path: "/message",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"message" */ "@/views/Message")
    ),
    meta: {
      title: "关于我",
    },
  },
  {
    name: "Project",
    path: "/project",
    component: getPageComponent(() =>
      import(/* webapckChunkName:"project" */ "@/views/Project")
    ),
    meta: {
      title: "项目&工程",
    },
  },
  {
    name: "NotFound",
    path: "*",
    component: NotFound,
  },
];
