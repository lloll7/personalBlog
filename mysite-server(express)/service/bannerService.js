/**
 * 业务逻辑层
 */

const md5 = require("md5");
const jwt = require("jsonwebtoken"); // 生成token，传入信息对象，密钥，有效时长(s)

// 导入数据库操作板块
const { findBannerDao, updateBannerDao } = require("../dao/bannerDao");

const { handleDataPattern, formatResponse } = require("../utils/tool");

// banner 模块的业务逻辑层
module.exports.findBannerService = async function () {
  const data = handleDataPattern(await findBannerDao());
  return formatResponse(0, "", data);
};

module.exports.updateBannerService = async function (bannerArr) {
  const data = handleDataPattern(await updateBannerDao(bannerArr));
  return formatResponse(0, "", data);
};
