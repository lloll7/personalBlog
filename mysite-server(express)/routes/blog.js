var express = require("express");
const {
  addBlogService,
  findBlogByPageService,
  findBlogByIdService,
  updateBlogService,
  deleteBlogService,
} = require("../service/blogService");
var router = express.Router();

// 添加博客
router.post("/", async function (req, res, next) {
  res.send(await addBlogService(req.body));
});

// 分页获取博客
router.get("/", async function (req, res, next) {
  res.send(await findBlogByPageService(req.query));
});
// 获取一个博客
router.get("/:id", async function (req, res, next) {
  // 一点：博客文章有个浏览量，当调用此接口时，流量量则+1，但是想要只有前台获取时浏览才有效，而后台调用该接口则希望无效
  // 找出前台和后台访问的不同点：前台调用该接口是不用携带token的，而后台在修改博客时才会调用该接口，是会带token的
  // 通过判断请求头有无携带token，来区分前后台的请求，分别进行处理
  const reqHeaders = req.headers;
  res.send(await findBlogByIdService(req.params.id, reqHeaders.authorization));
});
// 修改一个博客
router.put("/:id", async function (req, res, next) {
  res.send(await updateBlogService(req.params.id, req.body));
});
// 删除一个博客
router.delete("/:id", async function (req, res, next) {
  res.send(await deleteBlogService(req.params.id));
});

module.exports = router;
