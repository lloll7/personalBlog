var express = require("express");
var router = express.Router();
const {
  addMessageService,
  findMessageByPageService,
  deleteMessageService,
} = require("../service/messageService");

// 获取留言或者评论
router.get("/", async function (req, res, next) {
  res.send(await findMessageByPageService(req.query));
});
// 添加留言或者评论
router.post("/", async function (req, res, next) {
  res.send(await addMessageService(req.body));
});
// 删除留言或者评论
router.delete("/:id", async function (req, res, next) {
  res.send(await deleteMessageService(req.params.id));
});

module.exports = router;
