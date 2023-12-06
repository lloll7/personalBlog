const { findAboutDao, updateAboutDao } = require("../dao/aboutDao");
const { formatResponse } = require("../utils/tool");

// 获取关于我页面url
module.exports.findAboutService = async function () {
  const { url } = await findAboutDao();
  return formatResponse(0, "", url);
};

// 设置关于我页面rl
module.exports.updateAboutService = async function (newUrl) {
  const { url } = await updateAboutDao(newUrl);
  return formatResponse(0, "", url);
};
