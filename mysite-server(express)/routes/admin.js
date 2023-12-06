/**
 * 界面层
 */
var express = require("express");
var router = express.Router();
var { formatResponse, analysisToken } = require("../utils/tool");

// 引入业务逻辑板块
const { loginService, updateAdminService } = require("../service/adminService");
const { ValidationError } = require("../utils/errors");

/* 管理员登录, 二级路由 */
// 第一个接收到请求的地方
router.post("/login", async function (req, res, next) {
  //   首先应该先有一个验证码的验证,通过了才能进行之后的登录逻辑
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    // 如果进入此if，说明用户输入的验证码不正确
    throw new ValidationError("验证码输入错误");
  }
  //   验证码已经通过
  const result = await loginService(req.body);
  if (result.token) {
    res.setHeader("authentication", result.token);
  }
  res.send(formatResponse(0, "", result.data));
});

/* 恢复登陆状态 */
router.get("/whoami", async function (req, res, next) {
  // 1.从客户端的请求头中拿到token, 并对token进行解析，还原为用户信息对象
  const token = analysisToken(req.get("Authorization"));
  // 2.返回给客户端
  res.send(
    formatResponse(0, "", {
      loginId: token.loginId,
      name: token.name,
      id: token.id,
    })
  );
});

/* 修改管理员信息 */
router.put("/", async function (req, res, next) {
  res.send(await updateAdminService(req.body));
});

module.exports = router;
