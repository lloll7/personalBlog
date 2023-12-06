// 引入DataType
const { DataTypes } = require("sequelize");
// 引入数据库的连接实例
const sequelize = require("../dbConnect");

// 定义数据模型，相当于定义表结构
module.exports = sequelize.define(
  "setting",
  {
    // 这张表所拥有的字段
    avatar: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    siteTitle: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    github: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    qq: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    qqQrCode: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    weixin: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    weixinQrCode: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    mail: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    icp: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    favicon: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    githubName: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
