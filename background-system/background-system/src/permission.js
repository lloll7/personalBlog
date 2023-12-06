import router from "./router";
import store from "./store";
import { Message } from "element-ui"; // 单独引入使用elemrntUI的message的组件
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist 白名单（无需权限验证）

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken();

  const hasGetUserInfo = store.getters.user; // 获取本地用户信息

  if (to.meta.auth) {
    // 说明页面需要鉴权
    if (hasGetUserInfo) {
      // 进入此if说明有用户信息
      next(); // 直接放行
    } else {
      // 没有用户信息则看一下是否有token
      const hasToken = localStorage.getItem("adminToken");
      if (hasToken) {
        // 有token,我们还需要验证下token的有效性
        try {
          await store.dispatch("user/getInfo"); // 相当于之前学的whoAmI
          next(); // 有效则放行
        } catch (error) {
          // 无效则会被catch捕捉到,然后跳转到登录页
          await store.dispatch("user/resetToken");
          Message.error("登录信息已过期,请重新登录");
          next(`login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        // 没有token则需要重新登录
        next(`login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    // 说明页面不需要鉴权
    if (to.path === "/login" && hasGetUserInfo) {
      // 说明你现在是在登录的状态下,要去 login 页面,我们将其导航到首页
      next({ path: "/" });
    } else {
      next();
    }
    NProgress.done();
  }

  // 路由切换前，先判断你有没有token
  // 下方是vue-element-admin原本的鉴权流程
  // if (hasToken) {
  //   // 有token则进入判断

  //   // 判断你去的是否是login
  //   if (to.path === "/login") {
  //     // if is logged in, redirect to the home page
  //     // 是login则直接放行
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // 不是login

  //     // 看一下你是否有用户信息
  //     const hasGetUserInfo = store.getters.name;
  //     if (hasGetUserInfo) {
  //       // 有用户信息则直接方向
  //       next();
  //     } else {
  //       // 没有用户信息，但是有token，接下来则使用 localstorage 里面的token去服务器拿用户信息
  //       try {
  //         // get user info 获取当前用户信息
  //         await store.dispatch("user/getInfo");
  //         // 获取成功则放行
  //         next();
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         // 说明token有问题
  //         await store.dispatch("user/resetToken");
  //         Message.error(error || "Has Error");
  //         next(`/login?redirect=${to.path}`);
  //         NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   // 如果没有token;
  //   // 则判断你要去的是否是白名单的页面（即无需权限页面）
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     // 在白名单中则直接放权
  //     next();
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     // 若不在白名单，则不具备进去的权限，帮你跳转到指定位置
  //     next(`/login?redirect=${to.path}`);
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
