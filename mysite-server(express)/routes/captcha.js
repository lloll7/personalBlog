// 生成二维码

/**
 * 界面层
 */
var express = require("express");
var router = express.Router();

// 引入业务逻辑板块
const { getCaptchaService } = require("../service/captchaService");

/* 修改管理员信息 */
router.get("/", async function (req, res, next) {
  //  生成一个验证码
  const captcha = await getCaptchaService();
  req.session.captcha = captcha.text; // 将验证码的正确内容存入session中
  res.setHeader("Content-Type", "image/svg+xml"); // 设置响应头
  res.send(captcha.data);
});

module.exports = router;
