import request from "@/utils/request";
// 添加文章分类
export function addBlogType(data) {
  return request({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}
// 修改文章分类
export function updateOnrBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: "put",
    data: editInfo.data,
  });
}
// 删除文章分类
export function delOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "delete",
  });
}
// 获取文章分类
export function getBlogType() {
  return request({
    url: "/api/blogtype",
    method: "get",
  });
}
// 查找某一个文章分类
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "get",
  });
}
