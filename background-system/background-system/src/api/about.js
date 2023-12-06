import request from "@/utils/request/";
// 获取页面url
export function getAbout() {
  return request({
    url: "/api/about",
    method: "get",
  });
}
// 修改页面url
export function editAbout(data) {
  return request({
    url: "/api/about",
    method: "post",
    data,
  });
}
