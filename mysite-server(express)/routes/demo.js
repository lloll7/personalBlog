/**
 * 界面层
 */
var express = require("express");
var router = express.Router();

// 引入业务逻辑板块
const {
  updateDemoService,
  findAllDemoService,
  addDemoService,
  deleteDemoService,
} = require("../service/demoService");

// 新增项目
router.post("/", async function (req, res, next) {
  res.send(await addDemoService(req.body));
});

/* 获取项目 */
router.get("/", async function (req, res, next) {
  res.send(await findAllDemoService());
});

/* 修改项目 */
router.put("/:id", async function (req, res, next) {
  res.send(await updateDemoService(req.params.id, req.body));
});

/* 删除项目*/
router.delete("/:id", async function (req, res, next) {
  res.send(await deleteDemoService(req.params.id));
});

module.exports = router;
