var express = require("express");
var router = express.Router();
const multer = require("multer");

// 引入业务逻辑板块
const { getCaptchaService } = require("../service/captchaService");
const { uploading, formatResponse } = require("../utils/tool");
const { UploadError } = require("../utils/errors");

/* 上传文件 */
router.post("/", async function (req, res, next) {
  // single方法中书写上传空间的name值
  uploading.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new UploadError("上传文件失败，请检查文件的大小，控制在2MB以内"));
    } else {
      const path = "/static/uploads/" + req.file.filename;
      res.send(formatResponse(0, "", path));
    }
  });
});

module.exports = router;
