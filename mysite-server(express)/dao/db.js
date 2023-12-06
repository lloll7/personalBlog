// 该文件负责对数据库进行初始化操作
const sequelize = require("./dbConnect"); // 数据库连接实例
// 数据库模型
const adminModel = require("./model/adminModel");
const bannerModel = require("./model/bannerModel");
const blogTypeModel = require("./model/blogTypeModel");
const blogModel = require("./model/blogModel");
const demoModel = require("./model/demoModel");
const messageModel = require("./model/messageModel");
const settingModel = require("./model/settingModel");
const aboutModel = require("./model/aboutModel");

// 引入md5加密库
const md5 = require("md5");

(async function () {
  // 定义模型之间的关联关系（表之间的关系）

  // 博客和博客分类之间的关联
  blogTypeModel.hasMany(blogModel, {
    foreignKey: "categoryId",
    targetKey: "id",
  });
  blogModel.belongsTo(blogTypeModel, {
    foreignKey: "categoryId",
    targetKey: "id",
    as: "category",
  });

  // 博客和博客评论之间存在关联关系
  blogModel.hasMany(messageModel, { foreignKey: "blogId", target: "id" });
  messageModel.belongsTo(blogModel, {
    foreignKey: "blogId",
    target: "id",
    as: "blog",
  });

  // 将数据模型和表同步
  await sequelize.sync({
    // (官方文档)这将检查数据库中表的当前状态（有哪些列、数据类型等），然后对表进行必要的更改，使其与模型相匹配
    alter: true,
  });

  // 获取表中的内容数
  const adminCount = await adminModel.count();
  const bannerCount = await bannerModel.count();
  const settingCount = await settingModel.count();
  const aboutCount = await aboutModel.count();
  // 如果没有内容,则初始化一个默认内容
  if (!adminCount) {
    await adminModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"), // 对密码进行md5加密
    });
    console.log("初始化管理员信息完毕");
  }
  if (!bannerCount) {
    await bannerModel.bulkCreate([
      {
        middleImg: "/static/images/bg1_mid.jpg",
        bigImg: "/static/images/bg1_big.jpg",
        title: "塞尔达旷野之息",
        description: "2017年年度游戏，期待续作",
      },
      {
        middleImg: "/static/images/bg2_mid.jpg",
        bigImg: "/static/images/bg2_big.jpg",
        title: "塞尔达四英杰",
        description: "四英杰里面你最喜欢的又是谁呢",
      },
      {
        middleImg: "/static/images/bg3_mid.jpg",
        bigImg: "/static/images/bg3_big.jpeg",
        title: "日本街道",
        description: "动漫中经常出现的日本农村街道，一份独特的恬静",
      },
    ]);
    console.log("初始化首页标语数据...");
  }
  if (!aboutCount) {
    // 初始化全局设置
    await aboutModel.create({
      url: "https://oss.duyiedu.com/demo-summary/网页简历/index.html",
    });
    console.log("初始化关于页面url...");
  }
  if (!settingCount) {
    // 初始化全局设置
    await settingModel.create({
      avatar: "/static/images/avatar.jpg",
      siteTitle: "常明的陋室",
      github: "https://github.com/lloll7",
      githubName: "lloll7",
      qq: "2565527275",
      qqQrCode: "/static/images/qqCode.png",
      weixin: "Lzylloll",
      weixinQrCode: "/static/images/weixinCode.png",
      mail: "Lzylloll@outlook.com",
      icp: "暂无备案号",
      favicon: "/static/images/avatar.jpg",
    });
    console.log("初始化全局设置数据...");
  }
})();

console.log("数据库数据初始化完毕");
