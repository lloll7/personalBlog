// 引入DataType
const { DataTypes } = require("sequelize");
// 引入数据库的连接实例
const sequelize = require("../dbConnect");

// 定义数据模型，相当于定义表结构
module.exports = sequelize.define(
  "demo",
  {
    // 这张表所拥有的字段
    name: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    url: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    github: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    description: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    thumb: {
      type: DataTypes.STRING, // 类型
      allowNull: false, // 不允许为空
    },
    order: {
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
