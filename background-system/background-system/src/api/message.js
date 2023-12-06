import request from "@/utils/request";
// 获取留言
export function getMessage(page = 1, limit = 10) {
  return request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}
// 提交留言
export function addMessage(data) {
  return request({
    url: "/api/message",
    method: "post",
    data,
  });
}
// 删除留言
export function delMessage(id) {
  return request({
    url: `/api/message/${id}`,
    method: "delete",
  });
}
