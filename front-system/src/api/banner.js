import request from "./request";

// 获取首页标语
export function getBanner() {
  return request({
    url: "/api/banner",
    method: "get",
  });
}
