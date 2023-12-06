var express = require("express");
var router = express.Router();
const {
  findAboutService,
  updateAboutService,
} = require("../service/aboutService");

// 获取关于首页url
router.get("/", async function (req, res, next) {
  res.send(await findAboutService());
});
// 设置关于首页url
router.post("/", async function (req, res, next) {
  console.log(req.body.url, "asdasd");
  res.send(await updateAboutService(req.body.url));
});

module.exports = router;
