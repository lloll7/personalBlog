// 引包
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var md5 = require("md5"); // 加密算法包
var { expressjwt } = require("express-jwt"); // 专门用于验证客户端的token 能够还原解析jwt
const {
  ForbiddenError,
  ServiceError,
  UnknownError,
} = require("./utils/errors"); // 自定义的错误类型
const session = require("express-session"); // 建立服务端的session

// 读取环境变量
require("dotenv").config(); // 默认读取项目根目录下的.env环境变量文件
require("express-async-errors"); // 让express有能力捕获异步错误的库

// 引入数据库初始化文件（其中包含了数据库连接）
require("./dao/db");

// 引用路由
var adminRouter = require("./routes/admin.js");
var captchaRouter = require("./routes/captcha.js");
var bannerRouter = require("./routes/banner.js");
var uploadRouter = require("./routes/upload.js");
var blogTypeRouter = require("./routes/blogType.js");
var blogRouter = require("./routes/blog.js");
var demoRouter = require("./routes/demo.js");
var messageRouter = require("./routes/message.js");
var settingRouter = require("./routes/setting.js");
var aboutRouter = require("./routes/about.js");

// 创建服务器实例
var app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// view engine setup

// 使用各种中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 配置验证token接口
app.use(
  expressjwt({
    secret: md5(process.env.JWT_SECRET), // 判断客户端传入的token的密钥与服务器端是否一致
    // HS256：jwt中的一种签名算法
    algorithms: ["HS256"], // 新版本的的expressJWT 必须要求指定算法
  }).unless({
    // 不需要token验证的路由
    path: [
      { url: "/api/admin/login", methods: ["POST"] },
      { url: "/res/captcha", methods: ["GET"] },
      { url: "/api/banner", methods: ["GET"] },
      { url: "/api/blogtype", methods: ["GET"] },
      { url: "/api/blog", methods: ["GET"] },
      { url: /\/api\/blog\/\d/, methods: ["GET"] },
      { url: "/api/project", methods: ["GET"] },
      { url: "/api/message", methods: ["GET", "POST"] },
      { url: "/api/comment", methods: ["GET", "POST"] },
      { url: "/api/about", methods: ["GET"] },
      { url: "/api/setting", methods: ["GET"] },
    ],
  })
);

// 使用路由中间件, 这里第一个参数写的是一级路由,会与路由层的二级路由拼接在一起
app.use("/api/admin", adminRouter); // 访问localhost:3001/api/admin/login
app.use("/res/captcha", captchaRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/blogType", blogTypeRouter);
app.use("/api/blog", blogRouter);
app.use("/api/project", demoRouter);
app.use("/api/message", messageRouter);
app.use("/api/comment", messageRouter);
app.use("/api/setting", settingRouter);
app.use("/api/about", aboutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理，一旦发生错误就会到这
app.use(function (err, req, res, next) {
  console.log("error>>", err.name);
  console.log("errorMsg>>", err.message);
  if (err.name === "UnauthorizedError") {
    // 说明是 token 验证错误，接下来我们来抛出我们自定义的错误
    res.send(new ForbiddenError("未登录，或者登录已经过期").toResponseJSON());
  } else if (err instanceof ServiceError) {
    // 主要是ServiceError的子类错误,都进入
    res.send(err.toResponseJSON());
  } else {
    // 其他则抛出自定义的其他错误
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
