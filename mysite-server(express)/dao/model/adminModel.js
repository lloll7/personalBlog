// 引入DataType
const { DataTypes } = require("sequelize");
// 引入数据库的连接实例
const sequelize = require("../dbConnect");

// 定义数据模型，相当于定义表结构
module.exports = sequelize.define(
  "admin",
  {
    // 这张表所拥有的字段
    loginId: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    name: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    loginPwd: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
  },
  {
    freezeTableName: true, // 让建立的表名和模型名admin保持一致
    createdAt: false, // 关闭自动生成createDate
    updatedAt: false, // 关闭自动生成updateDate
  }
);
