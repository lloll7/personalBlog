// 专门做数据库的连接的文件
const { Sequelize } = require("sequelize");

// 创建数据库连接
/**
 * 传入数据库名，用户名，密码
 */
const sequelize = new Sequelize(
  process.env.DB_NAME, // 使用环境变量存储的配置信息
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    // 创建一个数据库连接实例
    host: process.env.DB_HOST, // 数据库所在域
    dialect: "mysql", // 使用的数据库类型
    logging: false, // 关闭日志，让控制台整洁一些
  }
);

// 向外暴露连接实例
module.exports = sequelize;

// async、await配合使用，定义一个立即执行函数
(async function () {
  try {
    await sequelize.authenticate();
    // 成功连接数据库
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
